import path from 'path';

import {
    buildImage, runContainer, getRunning, deleteContainer, getStats
} from '../../backend/docker/api';
import Server from '../../backend/portForwarding/ngrok';
import { copyDirectory } from '../../backend/utils/storage';

/*
 Setup constants
 */
const projectName = 'test-project';
const localPort = 13000;
const remotePort = 3000;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function testDocker() {
    const testDirectory = path.join(__dirname, 'example');
    copyDirectory(testDirectory, projectName);

    const buildInfo = await buildImage(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully built image!');
    console.log(buildInfo);

    await runContainer(projectName, localPort, remotePort);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully ran image!');

    const isRunning = await getRunning(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`Server is running: ${isRunning}`);

    await deleteContainer(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully deleted container!');
}

async function testServer() {
    const ngrokServer = new Server(localPort);

    const url = await ngrokServer.connect();
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`Successfully created tunnel to: ${url}`);

    await sleep(10000);

    await ngrokServer.disconnect();
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully disconnected from tunnel!');
}

async function testAll() {
    const buildInfo = await buildImage(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully built image!');
    console.log(buildInfo);

    await runContainer(projectName, localPort, remotePort);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully ran image!');

    const ngrokServer = new Server(localPort);
    const url = await ngrokServer.connect();
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`Successfully created tunnel to: ${url}`);

    await sleep(10000);

    const isRunning = await getRunning(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`Server is running: ${isRunning}`);

    const statsInfo = await getStats(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log(statsInfo);

    await deleteContainer(projectName);
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully deleted container!');

    await ngrokServer.disconnect();
    console.log('~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Successfully disconnected from tunnel!');
}

testDocker();
testServer();
testAll();
