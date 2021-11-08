import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { FilterContext } from '../Filter';

const HOME_PATH = process.env.REACT_APP_PUBLIC_URL;

function Option({region}) {    
  const filterContext = useContext(FilterContext);  
  const history = useHistory();  
  
  const handleValueOption = () => {
    filterContext.getValueOption(region.value);    
    if (region.value!=='All') history.push(`${HOME_PATH}region/${region.value}`)
    else history.push(HOME_PATH)    
  }    
  
  return (    
    <OptionItem onClick={handleValueOption} style={filterContext.valueOption===region.value ? {background: 'var(--SelectOptionBackground)', fontWeight: 'bold'}: {}}>
      <region.icon/>
      <div>{region.value}</div>
    </OptionItem>    
  );
}

export default (Option);

const OptionItem = styled.div`
  display: flex;
  align-items: center;  
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;  
  padding: 4px 8px;  

  &:hover {
    background: var(--SelectOptionBackground);
    font-weight: bold;
  }

  div {
    margin-left: 4px;
  }
  
`