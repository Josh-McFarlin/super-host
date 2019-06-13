import _ from 'lodash';

import { ADD_USAGE } from '../types/projectsUsage';


const initialState = {
    usage: []
};

export default function reducer(state = initialState, action) {
    const stateCopy = _.cloneDeep(state);

    switch (action.type) {
        case ADD_USAGE: {
            stateCopy.usage.push(action.payload);

            const { length } = stateCopy.usage;
            const maxLength = 30;
            if (length > maxLength) {
                stateCopy.usage.splice(0, length - maxLength);
            }

            return stateCopy;
        }
        default: {
            return state;
        }
    }
}
