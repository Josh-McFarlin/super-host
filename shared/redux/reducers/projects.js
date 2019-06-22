import _ from 'lodash';

import {
    PROJECT_CREATED, PROJECT_RAN, PROJECT_STARTED, PROJECT_STOPPED,
    PROJECT_DELETED, PROJECT_GOT_STATS, PROJECT_GOT_RUNNING
} from '../types/projects';


const initialState = {};

export default function reducer(state = initialState, action) {
    const stateCopy = _.cloneDeep(state);

    switch (action.type) {
        case PROJECT_CREATED: {
            const { projectName } = action.payload;

            stateCopy[projectName] = action.payload;

            return stateCopy;
        }
        case PROJECT_RAN: {
            const { projectName, status } = action.payload;

            stateCopy[projectName] = {
                ...stateCopy[projectName],
                status
            };

            return stateCopy;
        }
        case PROJECT_STARTED: {
            const { projectName, status } = action.payload;

            stateCopy[projectName] = {
                ...stateCopy[projectName],
                status
            };

            return stateCopy;
        }
        case PROJECT_STOPPED: {
            const { projectName, status } = action.payload;

            stateCopy[projectName] = {
                ...stateCopy[projectName],
                status
            };

            return stateCopy;
        }
        case PROJECT_DELETED: {
            const { projectName } = action.payload;

            delete stateCopy[projectName];

            return stateCopy;
        }
        case PROJECT_GOT_STATS: {
            const { projectName, stats } = action.payload;

            stateCopy[projectName] = {
                ...stateCopy[projectName],
                stats
            };

            return stateCopy;
        }
        case PROJECT_GOT_RUNNING: {
            const { projectName, status } = action.payload;

            stateCopy[projectName] = {
                ...stateCopy[projectName],
                status
            };

            return stateCopy;
        }
        default: {
            return state;
        }
    }
}
