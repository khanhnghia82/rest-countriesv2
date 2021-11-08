import React, { useEffect } from "react";
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
import { useParams } from "react-router";

function Countries(props) {
  const dispatch = useDispatch();
  const slug = useParams();
  const countries = useSelector((state) => state.Countries.countries);
  const loading = useSelector((state) => state.Countries.loading);

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
            {countries.length > 0 ?
              countries.map((country, index) => (
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
  grid-template-columns: repeat(4, auto);
  gap: 12px;
  padding: 4px 1px;    

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, auto);
    gap: 10px;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, auto);
    gap: 8px;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, auto);
  }
`;
