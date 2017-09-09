import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { all } from 'redux-saga/effects'

import App from './app';

import { genFeatureSagas, genFeatureReducer } from './genFeature/operations';


const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    genFeatureSagas()
  ])
}

const store = createStore(
  genFeatureReducer,
  applyMiddleware(
    sagaMiddleware,
    createLogger()
  )
)

sagaMiddleware.run(rootSaga)

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

const render = (app) => {

  ReactDOM.render(
    <Provider store={store} >
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    rootNode
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // const newRender = require('./app.js').default;
    render(App);
  });
}
