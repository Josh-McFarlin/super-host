import net from 'net';


export const getPort = () => new Promise((resolve, reject) => {
    const server = net.createServer();

    server.on('error', reject);

    server.on('listening', () => ((port) =>
        server.close(() => resolve(port))
    )(server.address().port));

    server.listen(0);
});
