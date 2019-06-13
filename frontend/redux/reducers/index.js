import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import shared from '../../../shared/redux/reducers';


export default function createRootReducer(history) {
    return combineReducers({
        ...shared,
        router: connectRouter(history)
    });
}
