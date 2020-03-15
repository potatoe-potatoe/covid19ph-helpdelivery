import { combineReducers } from 'redux'

import mainReducer from './main.reducer'

const allReducers = combineReducers({
  main: mainReducer,
  // test: testReducer,
  // current: currentReducer,
  // list: listReducer,
  // calendar: calendarReducer,
  // user: userReducer
});

export default allReducers;