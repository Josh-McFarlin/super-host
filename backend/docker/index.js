const cli = require('docker-cli-js');
const _ = require('lodash');

const Container = require('./Container');


class DockerController {
    constructor(workingDirectory) {
        const options = new cli.Options(
            null,
            workingDirectory
        );

        this.docker = new cli.Docker(options);
        this.containers = {};
    }

    createContainer(projectName, localPort) {
        const newCont = new Container(this.docker, projectName, localPort);

        this.containers[projectName] = newCont;

        return newCont;
    }

    async deleteContainer(container) {
        if (!(container instanceof Container || (_.isString(container) && !_.isEmpty(container)))) {
            throw new Error('A container name or object is required!');
        }

        const containerName = _.isString(container) ? container : container.projectName;

        await this.docker.command(`rm --force ${containerName}`);

        if (Object.prototype.hasOwnProperty.call(this.containers, containerName)) {
            delete this.containers[containerName];
        }
    }

    getContainer(projectName) {
        if (!_.isString(projectName) || _.isEmpty(projectName)) {
            throw new Error('A project name is required!');
        }

        if (!Object.prototype.hasOwnProperty.call(this.containers, projectName)) {
            throw new Error('Container not found!');
        }

        return this.containers[projectName];
    }
}

module.exports = DockerController;
