const ngrok = require('ngrok');


class Tunnel {
    constructor(localPort, protocol) {
        if (localPort == null) {
            throw new Error('A port number is required!');
        } else {
            this.localPort = localPort;
        }

        this.url = null;
    }

    async connect() {
        this.url = await ngrok.connect(this.localPort);

        return this.url;
    }

    async disconnect() {
        await ngrok.disconnect(this.url);
        await ngrok.kill();

        this.url = null;
    }

    getUrl() {
        return this.url;
    }
}

module.exports = Tunnel;
