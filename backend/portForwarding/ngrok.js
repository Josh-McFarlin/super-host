const ngrok = require('ngrok');


class Tunnel {
    constructor(localPort) {
        if (localPort == null) {
            throw new Error('A port number is required!');
        } else {
            this.localPort = localPort;
        }

        this.url = null;
        this.isConnected = false;

        process.on('SIGINT', async () => {
            if (this.isConnected) {
                await this.disconnect();
                console.log('Manually disconnected tunnel!');
                process.exit();
            }
        });
    }

    connect() {
        return ngrok.connect(this.localPort)
            .then((url) => {
                this.url = url;
                this.isConnected = true;

                return this.url;
            });
    }

    disconnect() {
        return ngrok.disconnect(this.url)
            .then(async () => {
                await ngrok.kill();

                this.url = null;
                this.isConnected = false;
            });
    }

    getUrl() {
        return this.url;
    }

    getStatus() {
        return this.isConnected;
    }
}

module.exports = Tunnel;
