const path = require('path');

const DockerController = require('../backend/docker');
const Server = require('../backend/portForwarding/ngrok');

/*
 Setup constants
 */
const workingDirectory = path.join(__dirname, 'example');
const projectName = 'test-project';
const localPort = 13000;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function testDocker() {
    const controller = new DockerController(workingDirectory);

    await controller.deleteContainer(projectName);

    const container = controller.createContainer(projectName, localPort);

    await container.buildImage()
        .then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully built image!');
            console.log(data);
        });

    await container.run()
        .then(() => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully started image!');
        });

    await container.getRunning()
        .then((status) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log(`Server is running: ${status}`);
        });

    await controller.deleteContainer(container)
        .then(() => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully deleted container!');
        });
}

async function testServer() {
    const ngrokServer = new Server(localPort);

    await ngrokServer.connect()
        .then((url) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log(`Successfully created tunnel to: ${url}`);
        });

    await sleep(10000);

    await ngrokServer.disconnect()
        .then(() => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully disconnected from tunnel!');
        });
}

async function testAll() {
    const controller = new DockerController(workingDirectory);
    const container = controller.createContainer(projectName, localPort);

    await container.buildImage()
        .then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully built image!');
            console.log(data);
        });

    await container.run()
        .then(() => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully started image!');
        });

    const ngrokServer = new Server(localPort);
    await ngrokServer.connect()
        .then((url) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log(`Successfully created tunnel to: ${url}`);
        });

    await sleep(10000);

    await container.getRunning()
        .then((status) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log(`Server is running: ${status}`);
        });

    await container.getStats()
        .then((stats) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log(stats);
        });

    await controller.deleteContainer(container)
        .then(() => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully deleted container!');
        });

    await ngrokServer.disconnect()
        .then(() => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
            console.log('Successfully disconnected from tunnel!');
        });
}

// testDocker();
// testServer();
// testAll();
