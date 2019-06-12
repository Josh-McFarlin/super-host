import { combineReducers } from 'redux';

import projects from '../../../shared/redux/reducers/projects';
import router from './router';


const createRootReducer = () => combineReducers({
    projects,
    router
});

export default createRootReducer;
