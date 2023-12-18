const fs = require('fs');
const server = require('http').createServer();
server.on('request', (req, res) => {
    //solution 1 using fs module
    // fs.readFile('content.txt', (error, data) => {
    //     if(error) console.log(error);
    //     res.end(data);
    // });
    //solution 2 using Steam module
    // const readable = fs.createReadStream('content.txt');
    // readable.on('data', (chunk) => res.write(chunk));
    // readable.on('end', () => res.end());
    // readable.on('error', (error) =>{
    //     console.log(error);
    //     res.statusCode = 500;
    //     res.end('File not found!');
    // } )
    //solution 3 using Fs Pipe
    const readable = fs.createReadStream('content.txt');
    readable.pipe(res);

});
server.listen(4000, '127.0.0.1', () => console.log('Listing on port 127.0.0.1:4000'));