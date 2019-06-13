import { call, put } from 'redux-saga/effects';

import { PROJECT_CREATED, PROJECT_DELETED } from '../../../shared/redux/types/projects';
import { getPort } from '../../utils/serverHelpers';
import {
    buildImage, runContainer, startContainer, stopContainer,
    deleteContainer, getStats, getRunning
} from '../../docker/api';
// eslint-disable-next-line no-unused-vars
import actions from '../../../frontend/redux/actions/projects';


export function* createProject(action) {
    const localPort = yield call(getPort);

    const {
        projectName,
        remotePort,
        source
    } = action.payload;

    yield call(buildImage(projectName));

    yield put({
        type: PROJECT_CREATED,
        payload: {
            projectName,
            localPort,
            remotePort,
            source,
            status: 'created'
        }
    });
}

export function* runProject(action) {
    const { projectName } = action.payload;

    yield call(runContainer(projectName));

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}

export function* startProject(action) {
    const { projectName } = action.payload;

    yield call(startContainer(projectName));

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}

export function* stopProject(action) {
    const { projectName } = action.payload;

    yield call(stopContainer(projectName));

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}

export function* deleteProject(action) {
    const { projectName } = action.payload;

    yield call(deleteContainer(projectName));

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}

export function* getProjectStats(action) {
    const { projectName } = action.payload;

    yield call(getStats(projectName));

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}

export function* getProjectRunning(action) {
    const { projectName } = action.payload;

    yield call(getRunning(projectName));

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}
