const defaultState = {
  details: {},
  list: [],
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_ITEM':
      return Object.assign({}, state, { details: action.data })
    case 'SET_HELP_LIST':
      return Object.assign({}, state, { list: action.data })
    default: 
      return state;
  }
}