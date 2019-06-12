import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { forwardToMainWithParams, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';

import createRootReducer from '../reducers/index';


const history = createHashHistory();

function configureStore() {
    const initialState = getInitialStateRenderer();

    // Set initial location
    history.replace(initialState.router.location);

    const rootReducer = createRootReducer(history);
    const router = routerMiddleware(history);
    const enhancer = applyMiddleware(forwardToMainWithParams(), thunk, router);

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    replayActionRenderer(store);

    return store;
}

export default { configureStore, history };
