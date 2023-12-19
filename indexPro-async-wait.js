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
const getDogname = async () => {
    try {
        const dog_name = await readFilePro('dog_name.txt');
        console.log('Dog name', dog_name);
        const response = await superagent.get(`https://dog.ceo/api/breed/${dog_name}/images/random`);
        let imageURL = response.body.message;
        console.log('Image URL', imageURL);
        await writeFilePro('dog_image.txt', imageURL);
        console.log('Random image has been saved to text file....');
    }
    catch (error) {
        console.log('Error', error);
    }
};
getDogname();