const fs = require('fs');
const products = JSON.parse(fs.readFileSync(`${__dirname}/../productData.json`));

exports.checkProductID = (req, res, next, product_id) => {
    if (req.params.id * 1 > products.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    next();
}
exports.checkBody = (request, response, next) =>{
    if( !request.body.title || !request.body.brand ){
        response.status(400).json({
            status : 'failed',
            message : 'Missing title or brand'
        })
    }
    next();
}
exports.getAllproducts = (req, res) => {
    const requestedAt = req.requestedAt;
    res.status(200).send({
        status: 'success',
        requestedAt: requestedAt,
        results: products.length,
        data: products
    })
}
exports.createProduct = (req, res) => {
    const id = products[products.length - 1].id + 1;
    const newProduct = Object.assign({ id: id }, req.body);
    products.push(newProduct);
    fs.writeFile(`${__dirname}/../productData.json`, JSON.stringify(products), error => {
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
exports.getProduct = (req, res) => {
    const p_id = req.params.id * 1;
    const product = products.find(p => p.id === p_id)
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
}
exports.updateProduct = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: "Your product has been updated......"
    })
}
exports.deletProduct = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}