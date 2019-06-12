import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import projects from '../../../shared/redux/reducers/projects';


export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        projects
    });
}
