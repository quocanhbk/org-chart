import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';


const aniIn = keyframes`
  100% {opacity: 1}
`
const aniOut = keyframes`
  100% {opacity: 0}
`
const TableWrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${props => props.isOut ? aniOut : aniIn} 0.15s ease-in-out 0s 1 forwards normal;
  
`
const PopupWrapper = ({ children, isOpen }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) setTimeout(() => setOpen(false), 200) 
        else setOpen(true)
    }, [isOpen]);

    return (
        open ?
        <TableWrapper isOut={!isOpen}>
            {children}
        </TableWrapper>
        : null
        
    );
};

PopupWrapper.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.element,
  headline: PropTypes.string
}

export default PopupWrapper;
