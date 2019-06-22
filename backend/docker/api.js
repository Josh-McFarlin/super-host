import { Docker, Options } from 'docker-cli-js';

import { getStorageLocation, deleteDirectory } from '../utils/storage';


const workingDirectory = getStorageLocation('projects');

const options = new Options(
    null,
    workingDirectory
);

const docker = new Docker(options);

// Create a new container
export function buildImage(projectName) {
    return docker.command(`build -t ${projectName}-img ./${projectName}`)
        .then((data) => data.response)
        .then((resp) => resp.join('\n'));
}

// Create and execute a new container
export function runContainer(projectName, localPort, remotePort) {
    return docker.command(`run --name ${projectName} -d -p ${localPort}:${remotePort} ${projectName}-img`);
}

// Start a stopped container
export function startContainer(projectName) {
    return docker.command(`start ${projectName}`);
}

// Stop a running container
export function stopContainer(projectName) {
    return docker.command(`stop ${projectName}`);
}

// Delete an existing project
export function deleteContainer(projectName) {
    return docker.command(`rm --force ${projectName}`)
        .then(() => docker.command(`image rm --force ${projectName}`))
        .then(() => deleteDirectory(projectName));
}

// Get resource stats of container
export function getStats(projectName) {
    return docker.command(`container stats ${projectName} --no-stream --format "{\\"memory\\":\\"{{ .MemUsage }}\\",\\"cpu\\":\\"{{ .CPUPerc }}\\"}"`)
        .then((data) => data.raw)
        .then((raw) => JSON.parse(raw));
}

// Check if the container is currently running
export function getRunning(projectName) {
    return docker.command(`inspect -f "{{.State.Running}}" ${projectName}`)
        .then((data) => data.object);
}
