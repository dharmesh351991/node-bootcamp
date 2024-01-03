//const fs = require('fs');
//const products = JSON.parse(fs.readFileSync(`${__dirname}/../productData.json`));
const Product = require('./../model/productModel');

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
exports.getAllproducts = async (req, res) => {
    try{
        const myProducts = await Product.find();
    res.status(200).send({
        status: 'success',
        results: myProducts.length,
        data: myProducts
    })
    }catch(error){
        res.status(404).send({
            status: 'failed',
            message : error
        })
    }
}
exports.createProduct = async (req, res) => {
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json(
            {
                status: 'success',
                data: {
                    product: newProduct
                }
            }
        );
    }catch(error){
        res.status(400).json(
            {
                status: 'failed',
                message : error
            }
        );
    }
}
exports.getProduct = async (req, res) => {
    try{
    const product = await Product.findById(req.params.id);
    //const product = products.find(p => p.id === p_id)
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
    }catch(error){
        res.status(404).send({
            status: 'failed',
            message : error
        })
    }
}
exports.updateProduct = async (req, res) => {
    try{    
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators : true
        });
        res.status(200).json({
            status: 'success',
            data: updatedProduct
        })
    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}
exports.deletProduct = async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    }catch(error){
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}