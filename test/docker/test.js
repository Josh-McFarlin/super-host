import path from 'path';

import {
    buildImage, runContainer, getRunning, deleteContainer, getStats
} from '../../backend/docker/api';
import Ngrok from '../../backend/portForwarding/ngrok';
import { copyDirectory } from '../../backend/utils/storage';

/*
 Setup constants
 */
const projectName = 'test-project';
const localPort = 13000;
const remotePort = 3000;

describe('docker', () => {
    it('should work only with Docker', async () => {
        const testDirectory = path.join(__dirname, 'example');
        await copyDirectory(testDirectory, projectName);

        const buildInfo = await buildImage(projectName);
        expect(buildInfo).not.toBeNull();

        await runContainer(projectName, localPort, remotePort);

        const isRunning = await getRunning(projectName);
        expect(isRunning).toBeTruthy();

        await deleteContainer(projectName);
    });

    it('should work only with Proxy', async () => {
        const ngrokServer = new Ngrok(localPort);

        const url = await ngrokServer.connect();
        expect(url).not.toBeNull();
        expect(url.length).toBeGreaterThan(0);

        await ngrokServer.disconnect();
    });

    it('should work with Docker and Proxy', async () => {
        const testDirectory = path.join(__dirname, 'example');
        await copyDirectory(testDirectory, projectName);

        const buildInfo = await buildImage(projectName);
        expect(buildInfo).not.toBeNull();

        await runContainer(projectName, localPort, remotePort);

        const ngrokServer = new Ngrok(localPort);
        const url = await ngrokServer.connect();
        expect(url).not.toBeNull();
        expect(url.length).toBeGreaterThan(0);

        const isRunning = await getRunning(projectName);
        expect(isRunning).toBeTruthy();

        const statsInfo = await getStats(projectName);
        expect(statsInfo).not.toBeNull();

        await deleteContainer(projectName);

        await ngrokServer.disconnect();

    });
});
