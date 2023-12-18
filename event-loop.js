const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;
setTimeout(() => console.log('Timer 1 has been finished'), 0);
setImmediate(() => console.log('Immidiate 1 has been completed'));
fs.readFile('content.txt', (error, data) => {
    console.log(`I/O operation has been finished!`);
    console.log(`=================================`);
    setTimeout(() => console.log('Timer 2 has been finished'), 0);
    setTimeout(() => console.log('Timer 3 has been finished'), 3000);
    setImmediate(() => console.log('Immidiate 2 has been completed'));
    process.nextTick(() => console.log('Process nextTick()'));
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,'~ password has been encrypted!');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,'~ password has been encrypted!');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,'~ password has been encrypted!');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start,'~ password has been encrypted!');
    });
});
console.log('This code is from top-level');
