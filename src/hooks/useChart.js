import { useRef, useState } from "react"
import Flow from '../drawFlow'

// onAddButtonClick(parentId)
//onUpdateButtonClick(oldId, parentId, data)

const useChart = (initData, onAddButtonClick, onUpdateButtonClick) => {

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
    let shapedData = initData.map(item => shape(item))

    const chartRef = useRef(new Flow(shapedData))
    const [chart, setChart] = useState(chartRef.current.nodes)
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
    
    return {chart, insertNode, updateNode}
}

export default useChart
