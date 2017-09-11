import { List, Map } from 'immutable';

const initialState = Map({ manifest: {}});

const thing = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SETS_SUCCESS':

      return Map(action.payload);

    default:
      return state;
  }
}

export default thing;
