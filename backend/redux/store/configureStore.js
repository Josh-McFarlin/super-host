const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { forwardToRenderer, triggerAlias, replayActionMain } = require('electron-redux');

const createRootReducer = require('../reducers/index');


const rootReducer = createRootReducer();
const enhancer = applyMiddleware(triggerAlias, thunk, forwardToRenderer);

function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    replayActionMain(store);

    return store;
}

module.exports = configureStore;
