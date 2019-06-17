export default {
    node: {
        dockerfile: (remotePort, startCommand) =>
            'FROM node:8\n'
            + 'WORKDIR /usr/src/app\n'
            + 'COPY package*.json ./\n'
            + 'RUN npm install\n'
            + 'COPY . .\n'
            + `ENV PORT ${remotePort}\n`
            + `EXPOSE ${remotePort}\n`
            + `CMD ${JSON.stringify(startCommand.split(' '))}`,
        dockerignore: () =>
            '.git\n'
            + '.gitignore\n'
            + 'node_modules\n'
            + 'npm-debug.log'
    }
};
