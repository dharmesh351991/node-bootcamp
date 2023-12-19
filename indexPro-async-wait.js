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
//Option 1 - using single API call to get image
// const getDogname = async () => {
//     try {
//         const dog_name = await readFilePro('dog_name.txt');
//         console.log('Dog name', dog_name);
//         const response = await superagent.get(`https://dog.ceo/api/breed/${dog_name}/images/random`);
//         let imageURL = response.body.message;
//         console.log('Image URL', imageURL);
//         await writeFilePro('dog_image.txt', imageURL);
//         console.log('Random image has been saved to text file....');
//     }
//     catch (error) {
//         console.log('Error', error);
//     }
//     return "Ready : ✨"
// };
//Option 1 - using multiple API call to get images
const getDogname = async () => {
    try {
        const dog_name = await readFilePro('dog_name.txt');
        console.log('Dog name', dog_name);
        const res_1 = superagent.get(`https://dog.ceo/api/breed/${dog_name}/images/random`);
        const res_2 = superagent.get(`https://dog.ceo/api/breed/${dog_name}/images/random`);
        const res_3 = superagent.get(`https://dog.ceo/api/breed/${dog_name}/images/random`);
        const response = await Promise.all([res_1, res_2, res_3]);
        const images = response.map(imageData => imageData.body.message );
        console.log('Images URL', images);
        await writeFilePro('dog_image.txt', images.join('\n'));
        console.log('Random image has been saved to text file....');
    }
    catch (error) {
        console.log('Error', error);
    }
    return "Ready : ✨"
};
(async () =>{
    const x = await getDogname();
    console.log('We will get image... 🛴');
    console.log(x);
    console.log('We have recieved image');
})()


