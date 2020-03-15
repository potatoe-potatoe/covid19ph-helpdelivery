const defaultState = {
  details: {}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_ITEM':
      return Object.assign({}, state, { details: action.data })
    default: 
      return state;
  }
}