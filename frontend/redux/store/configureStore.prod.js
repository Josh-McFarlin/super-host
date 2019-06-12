import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { forwardToMain, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';

import createRootReducer from '../reducers/index';


const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(forwardToMain, thunk, router);

function configureStore() {
    const initialState = getInitialStateRenderer();

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    replayActionRenderer(store);

    return store;
}

export default { configureStore, history };
