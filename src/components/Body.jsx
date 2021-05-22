import { useState } from 'react'
import ReactFlow from 'react-flow-renderer'
import styled from 'styled-components'
import useChart from '../hooks/useChart'
import departmentData, {} from '../sampleData'
import AddChildForm from './AddChildForm'
import DepartmentNode from './DepartmentNode'

const Container = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
    background: ${props => props.theme.color.border.primary};
    gap: 1px;
`
const FlowContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.color.background.primary};
    padding: 1rem;
`
const FlowBorder = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.color.background.secondary};
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
    & .react-flow__edge-path {
        stroke-width: 1;
        stroke: ${props => props.theme.color.fill.primary};
    }
    
`
const PopupContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    display: grid;
    place-items: center;
`

const Body = () => {
    
    const onAddButtonClick = (parentId) => {
        setParent(parentId)
        setPopup({mode: "add"})
    }
    const onUpdateButtonClick = (oldId, parentId, data) => {
        setUpdatingId(oldId)
        setParent(parentId)
        setPopup({mode: "update", data: data})
    }
    let {chart, insertNode, updateNode} = useChart(departmentData, onAddButtonClick, onUpdateButtonClick)
    const onLoad = (reactFlowInstance) => reactFlowInstance.setTransform({x: 10, y: 10, zoom: 0.8})
    const [popup, setPopup] = useState(null)
    const [parent, setParent] = useState()
    const [updatingId, setUpdatingId] = useState("")
    
    const handleFormSubmit = (data) => {
        if (popup.mode === "add")
            insertNode(data)
        else if (popup.mode === "update") {
            data.id = updatingId
            updateNode(data)
        }
            

        setPopup(null)
    }
    return (
        <Container>
            <FlowContainer>
                <FlowBorder>
                    <ReactFlow 
                        onLoad={onLoad}
                        elements={chart} 
                        nodesDraggable={false} 
                        nodesConnectable={false}
                        nodeTypes={{department: DepartmentNode}}
                        >
                    </ReactFlow>
                    {popup && 
                        <PopupContainer>
                            <AddChildForm 
                                chart={chart} 
                                parentId={parent} 
                                onSubmit={handleFormSubmit}
                                mode={popup.mode}
                                data={popup.data}
                                onClickX={() => setPopup(null)}
                            />
                        </PopupContainer>}
                </FlowBorder>
            </FlowContainer>
        </Container>
    )
}

export default Body