import axios from "axios";
import * as Types from "../types";

const countriesApi = "https://restcountries.com/v2";

export const getCountries = () => async (dispatch) => {
  try {
    dispatch({ type: Types.SET_LOADING, payload: true });
    dispatch({type: Types.RESET_COUNTRY});
    await axios
      .get(countriesApi + '/all')
      .then((res) => {
        const countries = res.data.map((country) => ({
          name: country.name,
          capital: country.capital,
          population: new Intl.NumberFormat().format(country.population),
          region: country.region,
          flag: country.flag,          
        }));
        dispatch({ type: Types.GET_COUNTRIES, payload: countries });
        dispatch({ type: Types.SET_LOADING, payload: false });
        dispatch({ type: Types.GET_TOTAL_COUNTRIES, payload: countries.length });
      })
      .catch((err) => {
        console.log("get countries api error: ", err);
      });
  } catch (error) {
    console.log("get countries api error: ", error);
  }
};

export const getCountryByName = (name) => async dispatch => {
  try {
    dispatch({type: Types.SET_LOADING, payload: true});
    dispatch({type: Types.RESET_COUNTRY});
    await axios.get(`${countriesApi}/name/${name}`)
      .then(res => {       
        dispatch({ type: Types.SET_LOADING, payload: false});
        dispatch({ type: Types.GET_COUNTRY_BY_NAME, payload: res.data[0] });
      })
      .catch((err) => {
        console.log("err", err);
      });
  } catch (error) {
    console.log("get countries name api error: ", error);
  }
}

export const getCountriesByName = (name) => async dispatch => {
  dispatch({type: Types.SET_LOADING, payload: true});
  dispatch({type: Types.RESET_COUNTRY});
  await axios.get(`${countriesApi}/name/${name}`)
    .then(res => {
      const countries = res.data.map(country => ({
        name: country.name,
        capital: country.capital,
        population: new Intl.NumberFormat().format(country.population),
        region: country.region,
        flag: country.flag, 
      }))
      dispatch({ type: Types.SET_LOADING, payload: false});
      dispatch({ type: Types.GET_COUNTRIES_BY_NAME, payload: countries });
      dispatch({ type: Types.GET_TOTAL_COUNTRIES, payload: countries.length });

    })
    .catch((err) => {
      console.log("get countries name api error: ", err);
      dispatch({ type: Types.SET_LOADING, payload: false});
      dispatch({ type: Types.GET_COUNTRIES_BY_NAME, payload: [] });
    });
}

export const getCountriesByRegion = (region) => async dispatch => {
  dispatch({type: Types.SET_LOADING, payload: true});
  dispatch({type: Types.RESET_COUNTRY});
  await axios.get(`${countriesApi}/region/${region}`)
    .then(res => {
      const countries = res.data.map(country => ({
        name: country.name,
        capital: country.capital,
        population: new Intl.NumberFormat().format(country.population),
        region: country.region,
        flag: country.flag, 
      }))
      dispatch({ type: Types.SET_LOADING, payload: false});
      dispatch({ type: Types.GET_COUNTRIES_BY_NAME, payload: countries });
      dispatch({ type: Types.GET_TOTAL_COUNTRIES, payload: countries.length });
    })
    .catch((err) => {
      console.log("get countries name api error: ", err);
    });
}