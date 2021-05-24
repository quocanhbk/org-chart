import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import styled, {keyframes} from 'styled-components'
import useClickOutside from '../hooks/useClickOutside'
import {getFader} from '../utils/color'
const Option = (props) => <div>{props.children}</div>

const StyledSpan = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${props => props.theme.color.text.primary};
`;
const IconChevronDown = () => {
    return (
        <StyledSpan>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </StyledSpan>
    )
}

Option.propTypes = {
    searchText: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    default: PropTypes.bool
}
const opa = keyframes `
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;
const out = keyframes`
    100% {transform: translateY(100%); opacity: 0;}
`;
const Container = styled.div`
    display: block;
    width: 100%;
    position: relative;
    cursor: pointer;
    margin-bottom: ${props => props.demo ? "8px" : "0px"};
`;
const Bar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid ${props => props.open ? props.theme.color.fill.primary : props.theme.color.border.primary};
    border-radius: 0.5rem;
    transition: border 0.15s linear;
    min-height: 2rem;

`;
const ItemContainer = styled.div`
    width: 100%;
    background: transparent;
    height: 100%;
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all 1s linear;
    padding: 0.3rem 0.5rem;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const OpenButton = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 0 4px;
    border: none;
    border-radius: 0;
    outline: 0;
    transform: ${props => props.isOpen ? "rotateX(180deg)" : "rotateX(0deg)"};
    transition: all 0.15s linear;
`;
const slideDown = keyframes`
    from {max-height: 0px; opacity: 0;}
    to {max-height: 15rem; opacity: 1;}
`;
const SelectContainer = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    position: absolute;
    overflow: hidden;
    width: 100%;
    z-index: 2;
    border-radius: 5px;
    margin-top: 0.4rem;
    top: 100%;
    animation: ${slideDown} 0.15s ease-out 0s 1 forwards normal;
`;
const Selection = styled.div`
    padding: 0.5rem;
    background-color: ${props => props.selected ? props.theme.color.border.primary: "transparent"};
    &:hover {
        background-color: ${props => props.selected ? props.theme.color.border.primary : props.theme.color.background.secondary};
    }
    color: ${props => props.theme.color.text.primary};
`;
const StyledItem = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.color.text.primary};
    background: ${props => props.theme.color.border.primary};
    padding: 0 0.2rem;
    animation: ${opa} 0.15s linear 0s 1 normal forwards;
    font-size: ${props=> props.theme.textSize.medium};
    overflow-x: hidden;
    cursor: pointer;
    transition: all 1s linear;
    &.item-out {
        animation: ${out} 0.15s ease-out 0s 1 normal forwards;
    }
`;

const SearchBarContainer = styled.div`
    background: transparent;
    padding: 0.5rem 0.5rem;
`;
const SearchBar = styled.input`
    background: transparent;
    padding: 0.25rem;
    font-size: 1rem;
    outline: 0;
    width: 100%;
    border: none;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    color: ${props => props.theme.color.text.primary};
`;
const SelectionContainer = styled.div`
    overflow: auto;
    max-height: 8rem;
    &::-webkit-scrollbar {
        width: 0rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => getFader(props.theme.color.fill.primary, 0.5)};
        border-radius: 999px;
    }
    &:hover {
        &::-webkit-scrollbar {
            width: 0.4rem;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: ${props => getFader(props.theme.color.fill.primary, 0.8)};
        }
        &::-webkit-scrollbar-thumb:active {
            background-color: ${props => props.theme.color.fill.primary};   
        }
    }
`
const Divider = styled.div`
    height: 0.5px;
    transform: translateY(-0.5px);
    background: ${props => props.theme.color.border.primary};
    margin: 0px 0.2rem 0px 0.6rem;
`
function Combox({onSelect, children, readOnly, searchable, multiple}) {
    const [isOpen, setIsOpen] = useState(false);
    const comboxRef = useClickOutside(() => setIsOpen(false))
    // Selected item
    const [items, setItems] = useState(children.filter(child => child.props.default).map(child => child.props))
    const [returnItems, setReturnItems] = useState([])
    const [seachText, setSeachText] = useState("")
    const [removingItem, setRemovingItem] = useState("")
    const refSearchBar = useRef(null)
    const click = useRef(true)
    
    const addItem = (itemProp) => {
        if (multiple) {
            if (items.map( item => item.id).includes(itemProp.id) ) { removeItem(itemProp.id) }
            else setItems([...items, itemProp])
        }
        else {
            setItems([itemProp])
            setIsOpen(false)
        }
        click.current = true
    }

    useEffect(() => {
        setReturnItems(items.map(item => item.value))
    },[items])


    useEffect(() => {
        if (click.current) {
            onSelect(returnItems)
            if (returnItems.length)
                click.current = false
        }
            
    }, [returnItems, onSelect])

    useEffect(() => {
        if (isOpen) {
            if (refSearchBar.current) {
                refSearchBar.current.focus()
                setSeachText("")
            }
        }
    }, [isOpen])

    const removeItem = (id) => {
        setRemovingItem(id)
        setTimeout(() => {
            setItems(items.filter(item => item.id !== id))
            setRemovingItem("")
        }, 300)
    }

    const handleSearchText = (e) => {
        setSeachText(e.target.value)
    }

    const handleOpen = (state) => {
        if (!readOnly)
            setIsOpen(state)
    }
    return (
        <Container ref={comboxRef}>
            <Bar open={isOpen}>
                <ItemContainer onClick={() => handleOpen(true)}>
                    {items.map(item => 
                    <StyledItem key={item.id} className={removingItem === item.id ? "item-out" : ""}>
                        {item.children}
                    </StyledItem>
                    )}
                </ItemContainer>
                {!readOnly && <OpenButton isOpen={isOpen} onClick={() => handleOpen(!isOpen)}><IconChevronDown/></OpenButton>}
            </Bar>
            {isOpen && 
                <SelectContainer>
                    {searchable &&
                    <SearchBarContainer>
                        <SearchBar ref={refSearchBar}  type="input" spellCheck="false" placeholder="Search..." value={seachText} onChange={handleSearchText}/>
                    </SearchBarContainer>
                    }
                    <SelectionContainer>
                    {
                        (searchable ? children
                        .filter(child => child.props.searchText.concat([child.props.value]).map(c => c.toString().toUpperCase()).join("|").includes(seachText.toUpperCase().trim()))
                        : children)
                            .map(child => 
                                <div key={child.props.id}>
                                <Selection 
                                    selected={items.map(item => item.id).includes(child.props.id)} 
                                    key={child.props.id}
                                    onClick={() => addItem(child.props)}>{child.props.children}
                                </Selection>
                                <Divider/>
                                </div>
                            )
                    }
                    </SelectionContainer>
                    
                </SelectContainer>
            }
        </Container>
    )
}

Combox.Option = Option
Combox.propTypes = {
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    onSelect: PropTypes.func
}
Combox.defaultProps = {
    multiple: false,
    searchable: false,
    onSelect: () => {}
}

export default Combox