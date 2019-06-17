import getPath from 'platform-folders';
import fs from 'fs-extra';
import simpleGit from 'simple-git';
import _ from 'lodash';


export const getStorageLocation = (location) =>
    `${getPath('appData')}/superHost/${location}`;

export const getProjectLocation = (projectName) =>
    `${getStorageLocation('projects')}/${projectName}`;

export const getProjectFileLocation = (projectName, fileName) =>
    `${getStorageLocation('projects')}/${projectName}/${fileName}`;

export const downloadProject = (source, projectName) => {
    const projectsLocation = getStorageLocation('projects');
    const git = simpleGit(projectsLocation);

    return new Promise((resolve, reject) => {
        git.clone(source, projectName, (error, data) => {
            if (!_.isNil(error)) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

export const createFile = (projectName, fileName, content) => {
    const filePath = getProjectFileLocation(projectName, fileName);

    return fs.outputFile(filePath, content, { flag: 'wx' });
};

export const copyDirectory = (source, projectName) => {
    const destination = getProjectLocation(projectName);

    return fs.ensureDir(destination)
        .then(() => fs.copy(source, destination));
};

export const deleteDirectory = (projectName) => {
    const directory = getProjectLocation(projectName);

    return fs.remove(directory);
};
