import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const HOME_PATH = process.env.REACT_APP_PUBLIC_URL;

function Search(props) {
  const themeContext = useContext(ThemeContext);
  const [ valueInput, setValueInput ] = useState('');
  
  const slug = useParams();  

  useEffect(() => {
    if (slug.name && slug.name!=='') setValueInput(slug.name);
    else setValueInput('')
  },[slug.name]);    

  return (
    <SearchPane>
      <h3>Search Country:</h3>
      <SearchElement>
        <input 
          type="text" 
          placeholder="Input the and enter to search..."
          onChange={e => setValueInput(e.target.value)}
          value={valueInput}         
        />
        <Link 
          to={valueInput!==''? `${HOME_PATH}search/${valueInput}`: HOME_PATH} 
          style={{width: '40px', height: '100%'}}           
        >
          <MdSearch className={`icon ${themeContext.theme}`} />
        </Link>
      </SearchElement>
    </SearchPane>
  );
}

export default React.memo(Search);

const SearchPane = styled.div`
  max-width: 320px;
  width: 100%;
  margin-top: 20px;  
  @media screen and (max-width: 600px) {
    margin-left: 0px;    
    max-width: 100%;    
  }
  h3 {
    font-size: 18px;
    font-weight: 600;
    text-shadow: var(--TextShadow);
  }
`;
const SearchElement = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 34px;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  .icon {
    height: 100%;
    width: 100%;
    padding: 2px;
    text-align: center;
    background: #aaa; !important;
    box-shadow: none; !important;    
    opacity: 75%;
    transition: opacity 0.2s linear;
    &:hover { opacity: 1};
  }
  input {
    border: 0;
    outline: none;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    margin: 0 8px;    
  }
`;

//     
//     
//     
//     
//     
//     ;
//     
//     
