const express = require('express');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');

const app = express();

// MIDDLEWARES
if( process.env.NODE_ENV == 'development' ){
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('Hello from middleware 👋');
    next();
})
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})

// ROUTES
app.use('/api/v1/products', productRouter);

module.exports = app;