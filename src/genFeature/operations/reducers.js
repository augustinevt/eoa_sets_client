const thing = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SETS_SUCCESS':

      return action.payload;

    default:
      return state;
  }
}

export default thing;
