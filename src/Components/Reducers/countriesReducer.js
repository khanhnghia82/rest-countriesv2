import * as Types from '../Store/types';
const CountriesReducerInitialState = {  
  countries: [],
  country: null,
  loading: true,  
  totalCountries: 0,
  startPage: 1
}
const CountriesReducer = (state = CountriesReducerInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.GET_COUNTRIES:
      return {...state, countries: payload}

    case Types.GET_COUNTRIES_BY_NAME:
      return {...state, countries: payload}

    case Types.GET_COUNTRIES_BY_REGION:
      return {...state, countries: payload}
    
    case Types.GET_COUNTRY_BY_NAME:         
      return {...state, country: payload}
    
    case Types.SET_LOADING:
      return {...state, loading: payload}      
   
    case Types.RESET_COUNTRY:
      return {...state, country: null}   

    case Types.GET_TOTAL_COUNTRIES:      
      return {...state, totalCountries: payload}
      
    default:
      return state
  }
}

export default CountriesReducer;