import { useRef, useState } from "react"
import Flow from '../drawFlow'
import xlsx from 'xlsx'
// onAddButtonClick(parentId)
//onUpdateButtonClick(oldId, parentId, data)

const useChart = (onAddButtonClick, onUpdateButtonClick) => {
    let chartRef = useRef()
    const [chart, setChart] = useState([])
    const [employeeData, setEmployeeData] = useState([])
    const [render, setRender] = useState(false)
    const handleSubmit = (file) => {
        let reader = new FileReader()
        reader.onload = (e) => {
            let data = new Uint8Array(e.target.result)
            let workbook = xlsx.read(data, {type: 'array'})
            let unitData = xlsx.utils.sheet_to_json(workbook.Sheets.Unit)
            let positionData = xlsx.utils.sheet_to_json(workbook.Sheets.Position)
            let employeeData = xlsx.utils.sheet_to_json(workbook.Sheets.Employee)
            let initDepartmentData = unitData.map((unit) => ({
                id: unit["Id"],
                data: {
                    name: unit["Title"],
                    head: unit["Direct Manager"],
                    staffs: positionData
                            .filter(pos => pos["Unit"] === unit["Id"])
                            .map(item => item["Employee"])
                            .filter(emp => emp !== unit["Direct Manager"])
                            .concat(unitData.filter(u => u["Parent"] === unit["Id"]).map(u => u["Direct Manager"]))
                            
                },
                parentId: unit["Parent"] === undefined ? null : unit["Parent"]
            }))

            let initEmployeeData = employeeData.map(emp => ({
                name: emp["Full Name"],
                jobTitle: positionData.find(pos => pos["Employee"] === emp["Email"])["Name"],
                email: emp["Email"]
            }))
            setEmployeeData(initEmployeeData)

            let shapedData = initDepartmentData.map(item => shape(item))
            chartRef.current = new Flow(shapedData)
            setChart(chartRef.current.nodes)
            setRender(true)
        }
        reader.readAsArrayBuffer(file)
    }

    const onDeleteNode = (nodeId) => {
        chartRef.current.deleteNode(nodeId)
        setChart([])
        setTimeout(() => {
            setChart(chartRef.current.nodes)
        }, 1);
    }
    const onUpdateNode = (id, data) => {
        let parentId = chartRef.current.getNode(id).parentId || null
        onUpdateButtonClick(id, parentId, data)
    }
    const shape = (item) => ({
        id: item.id,
        data: {
            name: item.data.name,
            head: item.data.head,
            staffs: item.data.staffs,
            onAddClick: onAddButtonClick,
            onDeleteClick: onDeleteNode,
            onUpdateClick: onUpdateNode
        },
        parentId: item.parentId
    })
    const insertNode = (data) => {
        data = shape(data)
        chartRef.current.insertNode(data)
        setChart([])
        setTimeout(() => {
            setChart(chartRef.current.nodes)
        }, 1);
    }
    const updateNode = (node) => {
        node = shape(node)
        chartRef.current.updateNode(node)
        setChart([])
        setTimeout(() => {
            setChart(chartRef.current.nodes)
        }, 1);
    }
    
    return {chart, render, employeeData, insertNode, updateNode, handleSubmit}
}

export default useChart
