import { call, put } from 'redux-saga/effects';

import { PROJECT_CREATED, PROJECT_DELETED } from '../../../shared/redux/types/projects';
import { getPort } from '../../utils/serverHelpers';
// eslint-disable-next-line no-unused-vars
import actions from '../../../frontend/redux/actions/projects';


export function* createProject(action) {
    const localPort = yield call(getPort);

    const {
        projectName,
        remotePort,
        source
    } = action.payload;

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

export function* deleteProject(action) {
    const { projectName } = action.payload;

    yield put({
        type: PROJECT_DELETED,
        payload: {
            projectName
        }
    });
}
