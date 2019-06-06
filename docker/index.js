const cli = require('docker-cli-js');


class DockerController {
    constructor(workingDirectory, projectName, localPort) {
        if (projectName == null) {
            throw new Error('A project name is required!');
        }

        if (localPort == null) {
            throw new Error('A port number is required!');
        }

        const options = new cli.Options(
            null,
            workingDirectory
        );

        this.docker = new cli.Docker(options);
        this.projectName = projectName;
        this.localPort = localPort;
    }

    // Create a new container
    buildImage() {
        return this.docker.command(`build -t ${this.projectName}-img .`).then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(data);
            return;
        });
    }

    // Create and execute a new container
    run() {
        const containerPort = 3000;

        return this.docker.command(`run --name ${this.projectName} -d -p ${this.localPort}:${containerPort} ${this.projectName}-img`).then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(data);
            return;
        });
    }

    // Start a stopped container
    start() {
        return this.docker.command(`start ${this.projectName}`).then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(data);
            return;
        });
    }

    // Stop a running container
    stop() {
        return this.docker.command(`stop ${this.projectName}`).then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(data);
            return;
        });
    }

    // Delete an existing container
    delete() {
        return this.docker.command(`rm --force ${this.projectName}`).then((data) => {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(data);
            return;
        });
    }
}

module.exports = DockerController;
