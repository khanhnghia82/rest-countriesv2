import axios from "axios";
import React, {  
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ScrollBar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import "./countryInfoStyle.css";

const getLanguages = (country) => {
  let result = "";
  country.languages.forEach((language) => {
    if (result !== "") result = result + "-" + language.name;
    else result += language.name;
  });
  return result;
};

const getCountryNameByCode = async (code) => {
  const result = await axios.get(`https://restcountries.com/v2/alpha?codes=${code}`)
  return result.data
}

function CountryInfo(props) {
  const [countriesBorder, setCountriesBorder] = useState([]);
  const themeContext = useContext(ThemeContext);
  const country = useSelector((state) => state.Countries.country);
  const refCountry = useRef(null);  

  const dataTable = [
    { title: "Native Name", value: country ? country.nativeName : "" },
    {
      title: "Official",
      value: country && country.altSpellings ? country.altSpellings[1] : "",
    },
    {
      title: "Population",
      value: country ? new Intl.NumberFormat().format(country.population) : "",
    },
    { title: "Region", value: country ? country.region : "" },
    { title: "Sub Region", value: country ? country.subregion : "" },
    { title: "Capital", value: country ? country.capital : "" },
    { title: "", value: "" },
    { title: "Top Level Domain", value: country ? country.topLevelDomain : "" },
    {
      title: "Currencies",
      value:
        country && country.currencies
          ? `${country.currencies[0].code} - ${country.currencies[0].name}`
          : "",
    },
    { title: "Languages", value: country ? getLanguages(country) : "" },
    { title: "", value: "" },
  ];  
  
  useEffect(() => {
    if (country && country.borders) {
      // console.log(country.borders);            
      getCountryNameByCode(country.borders)
        .then(res => {
          const countryName = res.map(country => country.name)
          setCountriesBorder(countryName);          
        })       
    }

    const showCountry = () => {
      if (country) refCountry.current.style.maxHeight = `${refCountry.current.scrollHeight}px`;
      else (refCountry.current.style.maxHeight = "0");
    };
    showCountry();
    document.addEventListener("resize", showCountry);
    return () => {
      document.removeEventListener("resize", showCountry);
    };
  }, [country]);  
  
  return (
    <div className="countryInfo" ref={refCountry}>      
      {
        (country) && (<ScrollBar
          style={{ maxHeight: "70vh", overflow: "hidden", width: "100%" }}
        >
          <h4 className="countryName">{country.name}</h4>
          <table>
            <tbody>
              {dataTable.map((item, index) => (
                <tr key={index}>
                  <td className="titleInfo">{item.title}</td>
                  <td>{item.title !== "" && ":"}</td>
                  <td className="valueInfo">{item.value}</td>
                </tr>
              ))}
              <tr>
                <td className="titleInfo">Border Countries</td>
                <td>:</td>
                <td>
                  <div className="borderList">
                    {countriesBorder.length > 0 &&
                      countriesBorder.map((country) => (
                        <Link to={`/country/${country}`} key={country}>
                          <div className={`${themeContext.theme} borderItem`}>
                            {country}
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </ScrollBar>)
      }
    </div>
  );
}

export default React.memo(CountryInfo);
