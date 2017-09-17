import { List, Map } from 'immutable';

const initialState = List([]);

const thing = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SETS_SUCCESS':

      return List(action.payload.manifest);

    case 'CREATE_SET_SUCCESS':
      const newSet = action.payload.set;
      const newSetId = action.payload.newSetId;
      // newSet._id = newSetId;
      newSet._id = 234 * Math.random();

      return state.push(newSet)

    case 'DELETE_SET_SUCCESS':
      console.log('delete success', action.payload)

      return state.filterNot(x => x._id === action.payload.setId)
      // console.log(x._id, action.payload.setId, x._id === action.payload.setId)

    case 'UPDATE_SET_SUCCESS':
      state.forEach((set, i) => {
        if (set._id === action.payload.id) {
          state.set(i, action.payload.setObj)
        }
      })

      return state.map(set => set) /// what's the deal with this????

    default:
      return state;
  }
}

export default thing;
