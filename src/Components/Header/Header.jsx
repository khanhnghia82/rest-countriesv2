import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import SwitchMode from './SwitchMode';

const HOME_PATH = process.env.REACT_APP_PUBLIC_URL;

function Header(props) {
  const themeContext = useContext(ThemeContext);    
  return (
    <HeaderPane className={themeContext.theme}>
      <Link to={HOME_PATH}>      
        <span>Where in the world?</span>
      </Link>
      <SwitchMode/>
    </HeaderPane>
  );
}

export default Header;

const HeaderPane = styled.div`  
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 10;
  
  span {
    font-weight: bold;
    font-size: 24px;
    text-shadow: var(--TextShadow);
    cursor: pointer;
    user-select: none;
  }
`
