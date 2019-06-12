// Types from connected-react-router
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';

const initialState = {
    location: {
        hash: '',
        pathname: '/',
        search: ''
    },
    action: 'POP'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return action.payload;
        case CALL_HISTORY_METHOD:
            return action.payload;
        default:
            return state;
    }
}
