import _ from 'lodash';

import { PROJECT_CREATED, PROJECT_DELETED } from '../types/project';


const initialState = {
    projects: [],
    runningProjects: []
};

export default function reducer(state = initialState, action) {
    const stateCopy = _.cloneDeep(state);

    switch (action.type) {
        case PROJECT_CREATED:
            stateCopy.projects.push(action.payload);

            return stateCopy;
        case PROJECT_DELETED:
            _.remove(stateCopy.projects, (project) => (
                project.projectName === action.payload.projectName
            ));

            return stateCopy;
        default:
            return state;
    }
}
