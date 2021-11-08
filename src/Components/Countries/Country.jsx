import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import "./country.css";

function Country(props) {
  const themeContext = useContext(ThemeContext);
  const { country } = props;
  
  return (
    <Link to={`/country/${country.name}`}>
      <CountryCard className={`${themeContext.theme} countryCard`} >
        <div className="image">
          <img src={country ? country.flag : "https://via.placeholder.com/300x200?text=Image+Error"} alt={country && country.name} />
        </div>

        <CountryInfo>
          <h3>{country ? country.name : ''}</h3>
          <div>
            Population: <span>{country ? country.population : ''}</span>
          </div>
          <div>
            Region: <span>{country ? country.region : ''}</span>
          </div>
          <div>
            Capital: <span>{country ? country.capital : ''}</span>
          </div>
        </CountryInfo>
      </CountryCard>
    </Link>
  );
}

export default React.memo(Country);

const CountryCard = styled.div`
  max-width: 420px;
  width: 100%;
  filter: brightness(1);
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 12px; 
  &:hover {
    filter: brightness(0.9);
  }
  &:hover img {
    transform: scale(1.1);
  }
  .image {
    width: 100%;
    height: 160px;    
    display: block;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;      
      transition: all 0.2s linear;
    }
  }
`;
const CountryInfo = styled.div`
  padding: 10px 16px;
  h3 {
    margin: 16px 0;
    font-size: 20px;
    font-weight: bold;
    height: 50px;
  }
  div {
    display: block;
    font-size: 16px;
    font-weight: 700;
    margin: 4px 0;
    span {
      font-weight: 400;
    }
  }
`;
