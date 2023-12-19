const fs = require('fs');
const superagent = require('superagent');
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, dog_name) => {
            if (error) reject('File not found 😥');
            resolve(dog_name);
        });
    });
};
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if (error) reject('File not found 😥');
            resolve('True');
        });
    })
}
readFilePro('dog_name.txt')
    .then(dog_name => {
        console.log('Dog name', dog_name);
        return superagent.get(`https://dog.ceo/api/breed/${dog_name}/images/random`)
    })
    .then(response => {
        console.log('Image URL', response.body.message);
        writeFilePro('dog_image.txt', response.body.message);
    })
    .then(() => {
        console.log('Random image has been saved to text file....');
    })
    .catch(error => {
        console.log('Error', error);
    });