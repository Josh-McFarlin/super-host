import { app } from 'electron';


export const getStorageLocation = (location) =>
    `${app.getPath('appData')}/superHost/${location}`;

export const getProjectLocation = (project) =>
    `${app.getPath('appData')}/superHost/projects/${project}`;
