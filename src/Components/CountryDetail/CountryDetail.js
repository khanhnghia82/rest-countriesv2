import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import CountryInfo from "./CountryInfo";
import Image from './Image';
import { getCountryByName } from '../Store/Actions/countriesActions';
import Loading from "../Loading";

function CountryDetail(props) {
  const themeContext = useContext(ThemeContext);
  const slug = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Countries.loading);
  // console.log(slug);
  
  useEffect(() => {
    dispatch(getCountryByName(slug.countryName));    
  },[slug.countryName])    
  
  return (
    <Wrapper>
      <BackButton className={themeContext.theme} onClick={history.goBack}>Go Back</BackButton>
      { loading ? <Loading/> :      
      <CountryContainer>
        <Image />
        <CountryInfo />
      </CountryContainer>}
    </Wrapper>
  );
}

export default React.memo(CountryDetail);

// overflow: hidden;
// height: 78vh;
const Wrapper = styled.div`
  padding-top: 20px;
`;
const BackButton = styled.div`
  display: block;
  width: 80px;
  height: 28px;
  line-height: 28px;
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
  filter: brightness(0.9);
  transition: all 0.3 linear;
  &:hover {
    filter: brightness(1);
    font-weight: bold;
    cursor: default;
    user-select: none;
  }
`;

const CountryContainer = styled.div`
  display: flex;  
  flex-direction: row;  
  margin-top: 30px;  
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

