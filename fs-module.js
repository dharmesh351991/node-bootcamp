const fs = require('fs');

//Blocking, Synchronous way
const readTxt = fs.readFileSync('txt/input-synchronous.txt', 'utf-8');
console.log('readTxt', readTxt);
console.log("");

const addTex = `We are on Node.js Bootcamp. ${readTxt}.\n Created on ${Date.now()}`;
fs.writeFileSync('txt/output-synchronous.txt', addTex);
console.log('File written successfully!');

//non-Blocking, Asynchronous way
fs.readFile('txt/start.txt', 'utf-8', (error, text1) => {
    fs.readFile(`txt/${text1}.txt`, 'utf-8', (error, text2) => {
        fs.readFile('txt/append.txt', 'utf-8', (error, text3) => {
            fs.writeFile('txt/final.txt', `${text2}\n${text3}`, 'utf-8', (error) => {
                console.log('Non-blocking file has been written successfully! :)')
            })
        })
    })
});
console.log('In non-blocking, I will console 1st');
