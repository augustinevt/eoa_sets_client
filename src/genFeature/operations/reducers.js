import { List, Map } from 'immutable';

const initialState = List([]);

const thing = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SETS_SUCCESS':

      return List(action.payload.manifest);

    case 'CREATE_SET_SUCCESS':
      const newSet = action.payload.set;
      const newSetId = action.payload.newSetId;
      newSet._id = newSetId;

      return state.push(newSet)

    default:
      return state;
  }
}

export default thing;
