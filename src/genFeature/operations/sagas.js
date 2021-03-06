import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import api from '../../helpers/api';
import clone from 'clone';

function* getSets(action) {
  console.log('hello')
  try {
    const manifest = yield call(api.getSets, action.payload);
    yield put({ type: 'GET_SETS_SUCCESS', payload: {manifest} });
    console.log('manifest', manifest)

  } catch (e) {
    yield put({ type: 'GET_SETS_FAILURE', message: e.message})
  }
}

function* loadingSaga() {
  yield takeLatest("GET_SETS_REQUESTED", getSets)
}

/// == CREATE SET == ///

function* createSet(action) {
  try {
    const newSetId = yield call(api.createSet, action.payload);
console.log('newSet', newSetId)
    yield put({ type: 'CREATE_SET_SUCCESS', payload: { set: action.payload, id: newSetId }});
  } catch (e) {
    yield put({ type: 'CREATE_SET_FAILURE', payload: action.payload });
  }
}

function* createSetSaga() {
  yield takeLatest("CREATE_SET_REQUESTED", createSet);
}

/// == DELETE SET == ///

function* deleteSet(action) {
  try {
    const setId = action.payload.setId;
    const deletedSetId = yield call( api.deleteSet, setId )
console.log('api call in saga', deletedSetId)
    yield put({ type: 'DELETE_SET_SUCCESS', payload: {setId: deletedSetId.setId}})
  } catch (e) {
    yield put({type: 'DELETE_SET_FAILURE', payload: null})
  }
}

function* deleteSetSaga() {
  yield takeLatest("DELETE_SET_REQUESTED", deleteSet);
}

/// ==== ///

function* rootSaga() {
  yield all([
    loadingSaga(),
    createSetSaga(),
    deleteSetSaga(),
  ])
}

export default rootSaga;
