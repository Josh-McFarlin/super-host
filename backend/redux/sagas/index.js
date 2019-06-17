import { takeEvery } from 'redux-saga/effects';

import {
    createProject, deleteProject, runProject, startProject,
    stopProject, getProjectStats, getProjectRunning
} from './projects';
import {
    CREATE_PROJECT, RUN_PROJECT, START_PROJECT, STOP_PROJECT,
    DELETE_PROJECT, GET_PROJECT_STATS, GET_PROJECT_RUNNING
} from '../../../shared/redux/types/projects';


export default function* sagas() {
    yield takeEvery(CREATE_PROJECT, createProject);
    yield takeEvery(RUN_PROJECT, runProject);
    yield takeEvery(START_PROJECT, startProject);
    yield takeEvery(STOP_PROJECT, stopProject);
    yield takeEvery(DELETE_PROJECT, deleteProject);
    yield takeEvery(GET_PROJECT_STATS, getProjectStats);
    yield takeEvery(GET_PROJECT_RUNNING, getProjectRunning);
}
