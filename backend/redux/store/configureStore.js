const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { forwardToRenderer, triggerAlias, replayActionMain } = require('electron-redux');

const createRootReducer = require('../reducers/index');


const isDev = process.env.NODE_ENV !== 'production';

function configureStore(initialState) {
    const logger = require('redux-logger').createLogger();
    const rootReducer = createRootReducer();
    const enhancer = isDev ?
        applyMiddleware(triggerAlias, thunk, logger, forwardToRenderer) :
        applyMiddleware(triggerAlias, thunk, forwardToRenderer);

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    replayActionMain(store);

    return store;
}

module.exports = configureStore;
