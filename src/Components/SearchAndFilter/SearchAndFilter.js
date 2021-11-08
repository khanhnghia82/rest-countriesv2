import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';
import Search from './Search';

function SearchAndFilter(props) {
  return (
    <SearchAndFilterPane>
      <Search />
      <Filter />
    </SearchAndFilterPane>
  );
}

export default SearchAndFilter;

const SearchAndFilterPane = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;   
    margin-left: 12px;
    margin-right: 12px;
  }
`