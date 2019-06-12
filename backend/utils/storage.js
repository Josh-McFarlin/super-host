import { app } from 'electron';


export const getStorageLocation = (location) =>
    `${app.getPath('appData')}/superHost/${location}`;
