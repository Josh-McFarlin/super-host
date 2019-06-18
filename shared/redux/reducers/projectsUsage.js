import _ from 'lodash';

import { ADD_USAGE } from '../types/projectsUsage';


const initialState = [];

export default function reducer(state = initialState, action) {
    const stateCopy = _.cloneDeep(state);

    switch (action.type) {
        case ADD_USAGE: {
            stateCopy.push(action.payload);

            const { length } = stateCopy;
            const maxLength = 30;
            if (length > maxLength) {
                stateCopy.splice(0, length - maxLength);
            }

            return stateCopy;
        }
        default: {
            return state;
        }
    }
}
