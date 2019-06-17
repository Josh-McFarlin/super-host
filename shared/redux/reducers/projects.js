import _ from 'lodash';

import { PROJECT_CREATED, PROJECT_DELETED } from '../types/projects';


const initialState = [];

export default function reducer(state = initialState, action) {
    const stateCopy = _.cloneDeep(state);

    switch (action.type) {
        case PROJECT_CREATED:
            stateCopy.push(action.payload);

            return stateCopy;
        case PROJECT_DELETED:
            _.remove(stateCopy, (project) => (
                project.projectName === action.payload.projectName
            ));

            return stateCopy;
        default:
            return state;
    }
}
