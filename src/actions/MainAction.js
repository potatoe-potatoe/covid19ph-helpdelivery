
const setDetails = (item) => async (dispatch) => {

  dispatch({ type: 'SET_ITEM', data: item})
}

export {
  setDetails,
}