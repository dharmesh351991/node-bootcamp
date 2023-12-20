const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Hello from middleware 👋');
    next();
})
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})

// 2) ROUTES CALLBACKS

const products = JSON.parse(fs.readFileSync(`${__dirname}/productData.json`));

const getAllproducts = (req, res) => {
    const requestedAt = req.requestedAt;
    res.status(200).send({
        status: 'success',
        requestedAt: requestedAt,
        results: products.length,
        data: products
    })
}
const createProduct = (req, res) => {
    const id = products[products.length - 1].id + 1;
    const newProduct = Object.assign({ id: id }, req.body);
    products.push(newProduct);
    fs.writeFile(`${__dirname}/productData.json`, JSON.stringify(products), error => {
        res.status(201).json(
            {
                status: 'success',
                data: {
                    product: newProduct
                }
            }
        );
    })
}
const getProduct = (req, res) => {
    const id = req.params.id * 1;
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
}
const updateProduct = (req, res) => {
    const id = req.params.id * 1;
    if (id > products.length) {
        res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: "Your product has been updated......"
    })
}
const deletProduct = (req, res) => {
    const id = req.params.id * 1;
    if (id > products.length) {
        res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}
//[Method 1] - To adding routes with CB
/*app.get('/api/v1/products', getAllproducts);
app.post('/api/v1/products', createProduct);
app.get('/api/v1/product/:id', getProduct)
app.put('/api/v1/product/:id', updateProduct );
app.delete('/api/v1/product/:id', deletProduct ); */

//[Method 2] - To adding routes with CB
// 3) ROUTES
app.route('/api/v1/products').get(getAllproducts).post(createProduct);
app.route('/api/v1/product/:id').get(getProduct).put(updateProduct).delete(deletProduct);

// 4) STARTED SERVER

const port = 4040;
app.listen(port, () => {
    console.log(`I am listening to the PORT:${port}`);
});