const thing = (state = {}, action) => {
  switch (action.type) {
    case 'SET_REQUEST_SUCCESS':

      return {...state, treeName: action.payload};

    default:
      return state;
  }
}

export default thing;
