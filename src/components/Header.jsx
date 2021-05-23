import styled from "styled-components"
import Context from '../Context'
import ThemeToggle from './ThemeToggle'
import UploadButton from "./UploadButton"
import xlsx from 'xlsx'

const Container = styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.color.fill.primary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.secondary};
    & h1 {
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 0.2rem;
    }
`

const Header = () => {
    const {themeContext} = Context.useContainer()
    const handleSubmit = (file) => {
        let reader = new FileReader()
        reader.onload = (e) => {
            let data = new Uint8Array(e.target.result)
            let workbook = xlsx.read(data, {type: 'array'})
            console.log(workbook.Sheets)
            console.log(xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1).map(row => row.Name))
        }
        reader.readAsArrayBuffer(file)
    }
    return (
        <Container>
            <h1>Organization Chart</h1>
            <UploadButton onSubmit={handleSubmit}/>
            <ThemeToggle value={themeContext.isDark} onSelect={() => themeContext.toggleTheme()}/>
        </Container>
    )
}

export default Header