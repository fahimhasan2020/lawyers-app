import { combineReducers } from 'redux';
import auth from './auth'; // Your reducer file
import statusstore from './statusstore';
import themingstore from './theming';
import locale from "./locale"
const rootReducer = combineReducers({
  auth: auth,
  statusstore:statusstore,
  themingstore:themingstore,
  locale:locale
});

export default rootReducer;
