import getPath from 'platform-folders';
import fs from 'fs-extra';


export const getStorageLocation = (location) =>
    `${getPath('appData')}/superHost/${location}`;

export const getProjectLocation = (projectName) =>
    `${getPath('appData')}/superHost/projects/${projectName}`;

export const copyDirectory = (source, projectName) => {
    const destination = getProjectLocation(projectName);

    return fs.ensureDir(destination)
        .then(() => fs.copy(source, destination));
};

export const deleteDirectory = (projectName) => {
    const directory = getProjectLocation(projectName);

    return fs.remove(directory);
};
