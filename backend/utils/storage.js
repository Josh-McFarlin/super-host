import { remote } from 'electron';
import ncp from 'ncp';


const { app } = remote;

export const getStorageLocation = (location) =>
    `${app.getPath('appData')}/superHost/${location}`;

export const getProjectLocation = (projectName) =>
    `${app.getPath('appData')}/superHost/projects/${projectName}`;

export const copyDirectory = (source, projectName, cb) => {
    const destination = getProjectLocation(projectName);

    return ncp(source, destination, cb);
};
