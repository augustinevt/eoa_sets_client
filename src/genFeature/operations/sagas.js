import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import api from '../../helpers/api';
import clone from 'clone';

function* getTrees(action) {
  try {
    const manifest = yield call(api.getSets, action.payload);
    yield put({ type: 'GET_SETS_SUCCESS', payload: {manifest} });

  } catch (e) {
    yield put({ type: 'GET_SETS_FAILURE', message: e.message})
  }
}

/// ===== ///

function* loadingSaga() {
  yield takeLatest("GET_SETS_REQUESTED", getTrees)
}

function* rootSaga() {
  yield all([
    loadingSaga(),
  ])
}

export default rootSaga;
