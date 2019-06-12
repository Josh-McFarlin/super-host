const { combineReducers } = require('redux');

const counter = require('./counter');


module.exports = function createRootReducer() {
    return combineReducers({
        counter
    });
};
