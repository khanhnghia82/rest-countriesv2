import { combineReducers } from 'redux';
import CountriesReducer from './countriesReducer';

const rootReducer = combineReducers({
  Countries: CountriesReducer,
})

export default rootReducer;