import config from '../config'
const axios = require('axios')

const setDetails = (item) => async (dispatch) => {
  dispatch({ type: 'SET_ITEM', data: item})
}

const getHelpLists = () => async (dispatch) => {
  const { data } = await axios.get(`${config.api}/help`)
  console.log('gethelplist', data)
  dispatch({ type: 'SET_HELP_LIST', data })

}

const saveHelpItem = (item) => async (dispatch) => {
  try {
    await axios.post(`${config.api}/help`, item)
  } catch (error) {
    alert(`Unable to perform request. \nFill-out all required details.\nServer: ${error.message}`)
  }

}

export {
  setDetails,
  saveHelpItem,
  getHelpLists,
}