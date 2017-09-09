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

/// ===== ///

function* loadingSaga() {
  yield takeLatest("GET_SETS_REQUESTED", getSets)
}

function* rootSaga() {
  yield all([
    loadingSaga(),
  ])
}

export default rootSaga;
