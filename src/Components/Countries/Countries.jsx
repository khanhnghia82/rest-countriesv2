import React, { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import styled from "styled-components";
import Country from "./Country";
import {
  getCountries,
  getCountriesByRegion,
  getCountriesByName,
} from "../Store/Actions/countriesActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router";
import { LIMIT_COUNTRIES_VIEW } from '../Store/constants';

function Countries(props) {
  const [currentCountries, setCurrentCountries] = useState([]);
  const dispatch = useDispatch();
  const slug = useParams(); 
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  
  const useQuery = () => new URLSearchParams(location.search);
  const page = useQuery().get('page');  

  const countries = useSelector((state) => state.Countries.countries);
  const loading = useSelector((state) => state.Countries.loading);
  const totalCountries = useSelector((state) => state.Countries.totalCountries);

  useEffect(() => {
    if (page===null) {
      history.push(`${url}?page=1`);      
    }
  },[page]);

  useEffect(() => {
    if (countries.length > 0) {
      const result = countries.slice(LIMIT_COUNTRIES_VIEW*page - LIMIT_COUNTRIES_VIEW, LIMIT_COUNTRIES_VIEW*page);
      setCurrentCountries(result);
    }
  },[countries, page]);
  
  useEffect(() => {
    if (slug.regionName) dispatch(getCountriesByRegion(slug.regionName));
    else if (slug.name) dispatch(getCountriesByName(slug.name));
    else dispatch(getCountries());
  }, [slug.regionName, slug.name]);
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollBar
          style={{
            maxHeight: "68vh",
            overflow: "hidden"            
          }}
        >
          <CountriesContainer>
            {currentCountries.length > 0 ?
              currentCountries.map((country, index) => (
                <Country key={index} country={country} />
              )):
              <h2>Not found any country</h2>
            }
          </CountriesContainer>
        </ScrollBar>
      )}
    </>
  );
}

export default React.memo(Countries);

// const CountriesContainer = styled.div`
//   width: 100%;
//   columns: 4;
//   gap: 12px;
//   padding: 4px 1px;
//   margin-left: 12px;

//   @media screen and (max-width: 1024px) {
//     columns: 3;
//     gap: 10px;
//   }
//   @media screen and (max-width: 768px) {
//     columns: 2;
//     gap: 8px;
//   }
//   @media screen and (max-width: 480px) {
//     columns: 1;
//   }
// `;
const CountriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 4px 1px;    

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, auto);
  }
`;
