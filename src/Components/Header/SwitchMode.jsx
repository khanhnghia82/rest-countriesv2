import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { RiMoonFill } from 'react-icons/ri';
import { BsFillSunFill } from 'react-icons/bs';
import './switch.css';

function SwitchMode(props) {
  const themeContext = useContext(ThemeContext);
  const [ isDark, setIsDark ] = useState(false);
  const refInput = useRef(null);
  const refCircle = useRef(null);
  const refToggle = useRef(null);  

  useEffect(() => {
    refInput.current.checked = isDark;
  },[isDark])
  
  const handleToggle = () => {
    refInput.current.checked = !refInput.current.checked;
    setIsDark(refInput.current.checked);
    themeContext.toggleTheme();    
  }  

  useEffect(() => {
    const changeBackgroundButton = () => {
      if (isDark) {
        refToggle.current.style.background = '#fff';
        refCircle.current.style.background = '#222';        
      }else {
        refToggle.current.style.background = 'var(--ToggleButtonBackground)';
        refCircle.current.style.background = '#fff';
      }
    }
    changeBackgroundButton();
    document.addEventListener('resize', changeBackgroundButton);
    return () => {
      document.removeEventListener('resize', changeBackgroundButton);
    }
  },[isDark])
  
  return (
    <>      
      <div className="ToggleButton" onClick={handleToggle} ref={refToggle}>
        <input type="checkbox" className="Input" ref={refInput}/>
        <div className="Icon">
          {(isDark) ? <RiMoonFill/> : <BsFillSunFill/>}
        </div>
        <div className="Circle" ref={refCircle}></div>
      </div>     
    </>
  );
}

export default React.memo(SwitchMode);