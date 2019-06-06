const path = require('path');

const DockerController = require('../docker');
const Server = require('../portForwarding/ngrok');


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function testDocker() {
    const workingDirectory = path.join(__dirname, 'example');
    const projectName = 'TestProject';
    const controller = new DockerController(workingDirectory, projectName);

    await controller.buildImage();
    await controller.run();
    await controller.delete();
}

async function testServer() {
    const ngrokServer = new Server(13000);

    const url = await ngrokServer.connect();
    console.log(`Created tunnel to: ${url}`);

    await sleep(10000);

    await ngrokServer.disconnect();
    console.log('Disconnected successfully!');
}

async function testAll() {
    const workingDirectory = path.join(__dirname, 'example');
    const projectName = 'test-project';
    const localPort = 13000;
    const controller = new DockerController(workingDirectory, projectName, localPort);

    await controller.buildImage();
    await controller.run();

    const ngrokServer = new Server(localPort);
    const url = await ngrokServer.connect();
    console.log(`Created tunnel to: ${url}`);

    await sleep(10000);

    await controller.delete();
    console.log('Successfully deleted container!');

    await ngrokServer.disconnect();
    console.log('Successfully disconnected from tunnel!');
}

// testDocker();
// testServer();
// testAll();
