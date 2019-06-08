const _ = require('lodash');


class Container {
    constructor(docker, projectName, localPort) {
        if (_.isNil(docker)) {
            throw new Error('A docker instance is required!');
        }

        if (!_.isString(projectName) || _.isEmpty(projectName)) {
            throw new Error('A project name is required!');
        }

        if (!_.isNumber(localPort)) {
            throw new Error('A port number is required!');
        }

        this.docker = docker;
        this.projectName = projectName;
        this.localPort = localPort;
    }

    // Create a new container
    buildImage() {
        return this.docker.command(`build -t ${this.projectName}-img .`)
            .then((data) => data.response)
            .then((resp) => resp.join('\n'));
    }

    // Create and execute a new container
    run(containerPort = 3000) {
        return this.docker.command(`run --name ${this.projectName} -d -p ${this.localPort}:${containerPort} ${this.projectName}-img`);
    }

    // Start a stopped container
    start() {
        return this.docker.command(`start ${this.projectName}`);
    }

    // Stop a running container
    stop() {
        return this.docker.command(`stop ${this.projectName}`);
    }

    // Get resource stats of container
    getStats() {
        return this.docker.command(`container stats ${this.projectName} --no-stream --format "{\\"memory\\":\\"{{ .MemUsage }}\\",\\"cpu\\":\\"{{ .CPUPerc }}\\"}"`)
            .then((data) => data.raw)
            .then((raw) => JSON.parse(raw));
    }

    // Check if the container is currently running
    getRunning() {
        return this.docker.command(`inspect -f "{{.State.Running}}" ${this.projectName}`)
            .then((data) => data.object);
    }
}

module.exports = Container;
