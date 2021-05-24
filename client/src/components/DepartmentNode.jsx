import { useState } from "react"
import { Handle } from "react-flow-renderer"
import styled from "styled-components"
import PopupWrapper from "./PopupWrapper"
import {peopleData} from '../sampleData'
import Icon from "./Icon"
import { getFader } from "../utils/color"
const Container = styled.div`
    border-radius: 0.2rem;
    overflow: hidden;
    background: ${props => props.theme.color.background.primary};
    width: 18rem;
    overflow: visible;
    border: 1px solid;
    border-color: ${props => props.selected ? props.theme.color.fill.primary : props.theme.color.border.primary};

    & .handle {
        background: transparent;
        border: 1px solid ${props => props.theme.color.fill.primary};
    }
    cursor: pointer;
`
const Header = styled.div`
    //background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    background: ${props => "linear-gradient(to right, "+ getFader(props.theme.color.border.primary, 0.5) + "," + getFader(props.theme.color.border.primary, 1) +")"};
    border-radius: 0.2rem 0.2rem 0 0;
    color: ${props => props.theme.color.fill.primary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    height: 2.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem 0 1rem;
    font-family: Campton;

    & .icon-container {
        display: flex;
        gap: 0.2rem;
    }
`
const NameBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
    position: relative;
`
const Avatar = styled.div`
    height: ${props => props.size || "2.5rem"};
    width: ${props => props.size || "2.5rem"};
    
    & img {
        height: 100%;
        border-radius: 99px;
    }
`
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const NameTag = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & b {
        font-weight: 500;
    }
    & span {
        font-size: 0.9rem;
        color: ${props => props.theme.color.text.secondary};
    }
`

const StaffBar = styled.div`
    border-top: 1px solid ${props => props.theme.color.border.primary};
    width: 100%;
    padding: 0rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 3rem;
    overflow: overlay;
    ::-webkit-scrollbar {width: 2px; height: 4px;}
    ::-webkit-scrollbar-track {background: transparent;}
    ::-webkit-scrollbar-thumb {background: ${props => props.theme.color.border.primary}; border-radius: 99px}
`
    
const DepartmentNode = ({id, data, selected}) => {
    const [popup, setPopup] = useState(false)
    return (
        <Container selected={selected} onMouseEnter={() => setPopup(true)} onMouseLeave={() => setPopup(false)}>
            <Handle type="source" position="bottom" className="handle"/>
            <Header>
                <p>{data.name}</p>
                <div className="icon-container">
                    <Icon icon="three-dots" color="info" onClick={() => data.onUpdateClick(id, data)}/>
                    <Icon icon="x" color="danger" onClick={() => data.onDeleteClick(id)}/>
                </div>
                
            </Header>
            <Body>
                <NameBar>
                    <Avatar>
                        <img src={`https://ttgvncom.sharepoint.com/sites/CommandCenter/_layouts/15/UserPhoto.aspx?Size=L&AccountName=${data.head}`} alt=""/>
                    </Avatar>
                    <NameTag>
                        <b>{peopleData.find(person => person.email === data.head).name}</b>
                        <span>{peopleData.find(person => person.email === data.head).jobTitle}</span>
                    </NameTag>
                    
                </NameBar>
                <StaffBar>
                    {data.staffs.map(staff => 
                        <Avatar size="2rem" title={staff}>
                            <img src={`https://ttgvncom.sharepoint.com/sites/CommandCenter/_layouts/15/UserPhoto.aspx?Size=L&AccountName=${staff}`} alt=""/>
                        </Avatar>
                    )}
                </StaffBar>
                <PopupWrapper isOpen={popup}>
                    <Icon icon="plus" color="primary" background="primary" onClick={() => data.onAddClick(id)}/>
                </PopupWrapper>
            </Body>
            <Handle type="target" position="left" className="handle"/>
        </Container>
    )
}

export default DepartmentNode