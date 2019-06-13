import { takeEvery } from 'redux-saga/effects';

import { createProject, deleteProject } from './projects';
import { CREATE_PROJECT, DELETE_PROJECT } from '../../../shared/redux/types/projects';


export default function* sagas() {
    yield takeEvery(CREATE_PROJECT, createProject);
    yield takeEvery(DELETE_PROJECT, deleteProject);
}
