const dotenv = require('dotenv');
dotenv.config({path: `${__dirname}/config.env`});
const app = require('./app');

// STARTED SERVER
const port = process.env.PORT | 4000;
app.listen(port, () => {
    console.log(`I am listening to the PORT:${port} and environment: ${process.env.NODE_ENV}`);
});