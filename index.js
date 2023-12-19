const fs = require('fs');
const superagent = require('superagent');
fs.readFile('dog_name.txt','utf8', (error, dog_name) => {
    console.log('dog name', dog_name);
    superagent
    .get(`https://dog.ceo/api/breed/${dog_name}/images/random`)
    .end((error,response) => {
        if(error) console.log(error);
        console.log(response.body.message);
        fs.writeFile('dog_image.txt', response.body.message, (error) => {
            if (error) throw err;
            console.log('Random image has been saved to text file....');
        } )
    });
})