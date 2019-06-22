import { call, put } from 'redux-saga/effects';

import {
    PROJECT_CREATED, PROJECT_DELETED, PROJECT_RAN, PROJECT_STARTED,
    PROJECT_STOPPED, PROJECT_GOT_STATS, PROJECT_GOT_RUNNING
} from '../../../shared/redux/types/projects';
import { getPort } from '../../utils/serverHelpers';
import {
    buildImage, runContainer, startContainer, stopContainer,
    deleteContainer, getStats, getRunning
} from '../../docker/api';
import { copyDirectory, downloadProject, createFile } from '../../utils/storage';
import projectInfo from '../../docker/projectInfo';
// Do not remove the next import, it is required for the backend
// eslint-disable-next-line no-unused-vars
import actions from '../../../frontend/redux/actions/projects';


export function* createProject(action) {
    const localPort = yield call(getPort);

    const {
        projectName,
        remotePort,
        projectType,
        source,
        sourceType
    } = action.payload;

    if (sourceType === 'url') {
        yield call(downloadProject, source, projectName);
    } else {
        yield call(copyDirectory, source, projectName);
    }

    if (projectType !== 'custom') {
        yield call(createFile, projectName, 'Dockerfile', projectInfo[projectType].dockerfile);
        yield call(createFile, projectName, '.dockerignore', projectInfo[projectType].dockerignore);
    }

    yield call(buildImage, projectName);

    yield put({
        type: PROJECT_CREATED,
        payload: {
            projectName,
            localPort,
            remotePort,
            projectType,
            source,
            sourceType,
            status: 'created'
        }
    });
}

export function* runProject(action) {
    const { projectName } = action.payload;

    yield call(runContainer, projectName);

    yield put({
        type: PROJECT_RAN,
        payload: {
            projectName,
            status: 'running'
        }
    });
}

export function* startProject(action) {
    const { projectName } = action.payload;

    yield call(startContainer, projectName);

    yield put({
        type: PROJECT_STARTED,
        payload: {
            projectName,
            status: 'running'
        }
    });
}

export function* stopProject(action) {
    const { projectName } = action.payload;

    yield call(stopContainer, projectName);

    yield put({
        type: PROJECT_STOPPED,
        payload: {
            projectName,
            status: 'stopped'
        }
    });
}

export function* deleteProject(action) {
    const { projectName } = action.payload;

    yield call(deleteContainer, projectName);

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}

export function* getProjectStats(action) {
    const { projectName } = action.payload;

    const stats = yield call(getStats, projectName);

    yield put({
        type: PROJECT_GOT_STATS,
        payload: {
            projectName,
            stats
        }
    });
}

export function* getProjectRunning(action) {
    const { projectName } = action.payload;

    const isRunning = yield call(getRunning, projectName);

    yield put({
        type: PROJECT_GOT_RUNNING,
        payload: {
            projectName,
            status: isRunning ? 'running' : 'stopped'
        }
    });
}
