const config = require('../config');
const axios = require('axios');

const setDetails = (item) => async (dispatch) => {
  dispatch({ type: 'SET_ITEM', data: item});
}

const getHelpLists = () => async (dispatch) => {
  const { data } = await axios.get(`${config.api}/help`);

  // debug logging
  console.log('getHelpLists() data');
  console.log(data);

  dispatch({ type: 'SET_HELP_LIST', data });
}

/* @function    Sends data to DB for insertion.
 * @params      item                Data to be saved to DB.
 * @return      string  (NG, OK)    OK if operation is successful, else NG.
 */
const saveHelpItem = (item) => async (dispatch) => {
  let result = 'OK';

  try {
    const { data } = await axios.post(`${config.api}/help`, item);
    alert('Your response has been recorded!\nCheck "Recent Items" list below for your submission.');

    // debug logging
    console.log('saveHelpItem() data');
    console.log(data);
  } catch (error) {
    alert('Unable to perform request.\n');

    // debug logging
    console.log(`Error: ${error.message}`);

    result = 'NG';
  }

  return result;
}

export {
  setDetails,
  saveHelpItem,
  getHelpLists,
};