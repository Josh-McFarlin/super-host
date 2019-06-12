import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { forwardToMainWithParams, replayActionRenderer, getInitialStateRenderer } from 'electron-redux';

import createRootReducer from '../reducers/index';
import * as projectsActions from '../actions/projects';


const history = createHashHistory();
const rootReducer = createRootReducer(history);

const configureStore = () => {
    // Redux Configuration
    const middleware = [];
    const enhancers = [];

    const initialState = getInitialStateRenderer();

    // electron-redux Middleware
    middleware.push(forwardToMainWithParams());

    // Thunk Middleware
    middleware.push(thunk);

    // Logging Middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true
    });

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }

    // Set initial location
    history.replace(initialState.router.location);

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);

    // Redux DevTools Configuration
    const actionCreators = {
        ...projectsActions,
        ...routerActions
    };
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
            actionCreators
        }) :
        compose;
    /* eslint-enable no-underscore-dangle */

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    // Create Store
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    if (module.hot) {
        module.hot.accept(
            '../reducers',
            // eslint-disable-next-line global-require
            () => store.replaceReducer(require('../reducers/index').default)
        );
    }

    replayActionRenderer(store);

    return store;
};

export default { configureStore, history };
