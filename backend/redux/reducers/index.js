import { combineReducers } from 'redux';

import shared from '../../../shared/redux/reducers';
import router from './router';


const createRootReducer = () => combineReducers({
    ...shared,
    router
});

export default createRootReducer;
