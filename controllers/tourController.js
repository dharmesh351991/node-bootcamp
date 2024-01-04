//const fs = require('fs');
//const products = JSON.parse(fs.readFileSync(`${__dirname}/../productData.json`));
const Tour = require('../model/tourModel');

exports.checkProductID = (req, res, next, product_id) => {
    if (req.params.id * 1 > products.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    next();
}
exports.checkBody = (request, response, next) => {
    if (!request.body.title || !request.body.brand) {
        response.status(400).json({
            status: 'failed',
            message: 'Missing title or brand'
        })
    }
    next();
}
exports.getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).send({
            status: 'success',
            results: tours.length,
            data: tours
        })
    } catch (error) {
        res.status(404).send({
            status: 'failed',
            message: error
        })
    }
}
exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json(
            {
                status: 'success',
                data: {
                    tour: newTour
                }
            }
        );
    } catch (error) {
        res.status(400).json(
            {
                status: 'failed',
                message: error
            }
        );
    }
}
exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        //const product = products.find(p => p.id === p_id)
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(404).send({
            status: 'failed',
            message: error
        })
    }
}
exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: tour
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}
exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}