import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from '../reducers';
import sagas from '../sagas';


const isDev = process.env.NODE_ENV !== 'production';

export default function configureStore(initialState) {
    const logger = require('redux-logger').createLogger();
    const sagaMiddleware = createSagaMiddleware();

    const rootReducer = createRootReducer();
    const enhancer = isDev ?
        applyMiddleware(triggerAlias, thunk, sagaMiddleware, logger, forwardToRenderer) :
        applyMiddleware(triggerAlias, thunk, sagaMiddleware, forwardToRenderer);

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    replayActionMain(store);
    sagaMiddleware.run(sagas);

    return store;
}
