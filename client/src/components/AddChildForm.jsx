import { useState } from "react"
import styled from "styled-components"
import { getFader } from "../utils/color"
import Combox from "./Combox"
import Icon from './Icon'
const Container = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    padding: 0.5rem;
    background: ${props => props.theme.color.background.primary};
    border-radius: 0.5rem;
    width: 25rem;
`
const FormTitle = styled.h3`
    font-weight: 500;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    & label {
        color: ${props => props.theme.color.text.secondary};
    }
`
const StyledInput = styled.input`
    display: block;
    border: 1px solid ${props => props.theme.color.border.primary};
    background: transparent;
    height: 2rem;
    width: 100%;
    border-radius: 0.5rem;
    outline: none;
    color: ${props => props.theme.color.text.primary};
    font-size: 1rem;
    padding: 0 0.5rem;
    transition: border 0.15s linear;

    &:focus {
        border-color: ${props => props.theme.color.fill.primary};
    }
`
const Button = styled.button`
    display: block;
    width: 100%;
    border: none;
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background: ${props => getFader(props.theme.color.fill.primary, 0.8)};
    }
`
const Avatar = styled.div`
    height: ${props => props.size || "2.5rem"};
    width: ${props => props.size || "2.5rem"};
    
    & img {
        height: 100%;
        border-radius: 99px;
    }
`
const ComboxTag = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`
const AddChildForm = ({onSubmit, chart, parentId, onClickX, mode, data, employeeData}) => {
    const [name, setName] = useState(data && data.name)
    const [head, setHead] = useState(data && data.head)
    const [staffs, setStaffs] = useState(data ? data.staffs : [])
    const [parent, setParent] = useState("")
    const handleOnChange = (e) => { 
        setName(e.target.value)
    }
    const handleSelect = (field, v) => {
        if (field === "parent")
            setParent(v[0])
        else if (field === "head")
            setHead(v[0])
        else if (field === "staffs")
            setStaffs(v)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !head) {
            alert("Not enough information!")
            return
        }
        onSubmit({
            id: mode === "add" ? name.replace(" ", "").toLowerCase() : "",
            data: {
                name: name,
                head: head,
                staffs: staffs
            },
            parentId: parent
        })
    }
    return (
        <Container>
            <FormTitle>
                <p>{mode === "add" ? "Add Department" : "Update Department"}</p>
                <Icon icon="x" color="danger" onClick={onClickX}/>
            </FormTitle>
            <FormBody>
                <FormControl>
                    <label>Parent</label>
                    <Combox onSelect={v => handleSelect("parent", v)} readOnly={mode === "update"}>
                        {chart.filter(item => item.data).map(item => 
                            <Combox.Option key={item.id} id={item.id} value={item.id} default={item.id === parentId}>
                                {item.data.name}
                            </Combox.Option>
                        )}
                    </Combox>
                </FormControl>
                <FormControl>
                    <label>Department Name</label>
                    <StyledInput type="text" value={name} onChange={handleOnChange}/>
                </FormControl>
                <FormControl>
                    <label>Head</label>
                    <Combox onSelect={v => handleSelect("head", v)} searchable>
                        {employeeData.map(person => 
                            <Combox.Option 
                                key={person.email} 
                                id={person.email} 
                                value={person.email} 
                                default={person.email === head}
                                searchText={Object.values(person)}
                            >
                                <ComboxTag>
                                    <Avatar size="1.2rem">
                                        <img src={`https://ttgvncom.sharepoint.com/sites/CommandCenter/_layouts/15/UserPhoto.aspx?Size=L&AccountName=${person.email}`} alt=""/>
                                    </Avatar>
                                    <p>{person.name}</p>
                                </ComboxTag>
                            </Combox.Option>    
                        )}
                    </Combox>
                </FormControl>
                <FormControl>
                    <label>Staffs</label>
                    <Combox onSelect={v => handleSelect("staffs", v)} multiple searchable>
                        {employeeData.map(person => 
                            <Combox.Option 
                                key={person.email} 
                                id={person.email} 
                                value={person.email} 
                                default={staffs.includes(person.email)}
                                searchText={[person.email, person.jobTitle, person.name]}
                            >
                                <ComboxTag>
                                    <Avatar size="1.2rem">
                                        <img src={`https://ttgvncom.sharepoint.com/sites/CommandCenter/_layouts/15/UserPhoto.aspx?Size=L&AccountName=${person.email}`} alt=""/>
                                    </Avatar>
                                    <p>{person.name}</p>
                                </ComboxTag>
                                
                            </Combox.Option>    
                        )}
                    </Combox>
                </FormControl>
            </FormBody>
            <Button onClick={handleSubmit}>{mode === "add" ? "Add" : "Update"}</Button>
        </Container>
    )
}

export default AddChildForm