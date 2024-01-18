const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const Tour = require('./../../model/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser : true
}).then( (result) => console.log('The connection to the database was successful!') )
.catch(error => console.log(error))

//READ tour json file 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tourData.json`, 'utf-8'));
console.log('tours', tours);
//IMPORT data from a JSON file into the database.
const importTours = async() => {
    try{
        await Tour.create(tours);
        console.log('Data has been imported successfully!');
    }catch(error){
        console.log(error);
    }
}
//DELETE Tour data from the database
const deleteTours = async () => {
    try{
        await Tour.deleteMany();
        console.log('Tours has been deleted successfully!')
    }catch(error){
        console.log(error);
    }
}
if( process.argv[2] === '--import' ){
    importTours();
}else if(process.argv[2] === '--delete' ){
    deleteTours();
}
console.log('Argv', process.argv);