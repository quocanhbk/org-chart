import styled from "styled-components";
import { getFader } from "../utils/color";

const Container = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.color.fill[props.color || "primary"]};
    background: ${props => props.background ? props.theme.color.background[props.background] : 'transparent'};
    cursor: pointer;
    border-radius: 99px;
    padding: 0.1rem;

    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`

const Icon = ({icon, color, background, size, onClick}) => {
    let ico
    switch(icon) {
        case 'x': 
            ico = 
            <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            break
        case 'plus':
            ico = 
            <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            break
        case 'three-dots':
            ico =
            <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
            break
        default:
            break
    }
    return (
        <Container color={color} background={background} onClick={onClick}>
            {ico}
        </Container>
    )
}

export default Icon