const eventEmitter = require('events');
const http = require('http');
class Sales extends eventEmitter {
    constructor() {
        super();
    }
}
const myEmitter = new Sales();
myEmitter.on('newSales', () => console.log('The new sale has been started 🎉'));
myEmitter.on('newSales', () => console.log('Customer name is : Alex 😊'));
myEmitter.emit('newSales');

//================================================//
const server = http.createServer();
server.on('request', (request, response) =>{
    console.log('Request has recieved! ✔✔');
    response.end('Request has recieved! ✔✔');
});
server.on('request', (request, response) =>{
    console.log('Another Request has recieved! ✔✔');
});
server.on('close', () => console.log('Server closed!'));

server.listen(4000, '127.0.0.1', () => console.log('We are waiting for requests 😊'));