const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
module.exports.INCREMENT_COUNTER = INCREMENT_COUNTER;

const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
module.exports.DECREMENT_COUNTER = DECREMENT_COUNTER;

function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}
module.exports.increment = increment;

function decrement() {
    return {
        type: DECREMENT_COUNTER
    };
}
module.exports.decrement = decrement;

function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}
module.exports.incrementIfOdd = incrementIfOdd;

function incrementAsync(delay = 1000) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment());
        }, delay);
    };
}
module.exports.incrementAsync = incrementAsync;
