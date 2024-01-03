const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true
}).then((res) => console.log('Database connection successfull!'))
.catch(error => console.log('[Error] - Not connected to DB', error))

// STARTED SERVER
const port = process.env.PORT | 4000;
app.listen(port, () => {
    console.log(`I am listening to the PORT:${port} and environment: ${process.env.NODE_ENV}`);
});