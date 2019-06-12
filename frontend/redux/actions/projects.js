import { createAliasedAction } from 'electron-redux';

import { CREATE_PROJECT, DELETE_PROJECT } from '../../../shared/redux/types/project';


export const createProject = createAliasedAction(
    CREATE_PROJECT,
    (projectName, remotePort, source) => ({
        type: CREATE_PROJECT,
        payload: {
            projectName,
            remotePort,
            source
        }
    })
);

export const deleteProject = createAliasedAction(
    DELETE_PROJECT,
    (projectName) => ({
        type: DELETE_PROJECT,
        payload: {
            projectName
        }
    })
);
