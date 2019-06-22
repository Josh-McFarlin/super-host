import { createAliasedAction } from 'electron-redux';

import {
    CREATE_PROJECT, RUN_PROJECT, START_PROJECT, STOP_PROJECT,
    DELETE_PROJECT, GET_PROJECT_STATS, GET_PROJECT_RUNNING
} from '../../../shared/redux/types/projects';


export const createProject = createAliasedAction(
    CREATE_PROJECT,
    (projectName, remotePort, projectType, source, sourceType) => ({
        type: CREATE_PROJECT,
        payload: {
            projectName,
            remotePort,
            projectType,
            source,
            sourceType
        }
    })
);

export const runProject = createAliasedAction(
    RUN_PROJECT,
    (projectName) => ({
        type: RUN_PROJECT,
        payload: {
            projectName
        }
    })
);

export const startProject = createAliasedAction(
    START_PROJECT,
    (projectName) => ({
        type: START_PROJECT,
        payload: {
            projectName
        }
    })
);

export const stopProject = createAliasedAction(
    STOP_PROJECT,
    (projectName) => ({
        type: STOP_PROJECT,
        payload: {
            projectName
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

export const getStats = createAliasedAction(
    GET_PROJECT_STATS,
    (projectName) => ({
        type: GET_PROJECT_STATS,
        payload: {
            projectName
        }
    })
);

export const getRunning = createAliasedAction(
    GET_PROJECT_RUNNING,
    (projectName) => ({
        type: GET_PROJECT_RUNNING,
        payload: {
            projectName
        }
    })
);
