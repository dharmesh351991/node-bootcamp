//const fs = require('fs');
//const products = JSON.parse(fs.readFileSync(`${__dirname}/../productData.json`));
const Tour = require('../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

/*exports.checkProductID = (req, res, next, product_id) => {
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
} */

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-price';
    req.query.fields = 'name,duration,difficulty,price,summary';
    next();
}
exports.getTours = async (req, res) => {
    try {
        //BUILD QUERY

        //1) FILTERING
        // const queryObj = { ...req.query };
        // const excludedFields = ['page', 'sort', 'limit', 'fields'];
        // excludedFields.forEach(field => delete queryObj[field]);
        // //const query = Tour.find(queryObj);
        // // const query = await Tour.find().
        // // where('difficulty').equals('easy').
        // // where('duration').equals(5);
        // // 2) ADAVANCED FILTERING
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`);
        // let query = Tour.find(JSON.parse(queryStr));

        // 3) SORTING
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy);
        // }else{
        //     query = query.sort('-createdAt');
        // }
        // 4) FIELDS LIMITING
        // if(req.query.fields){
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // }else{
        //     query = query.select('-__v');
        // }
        // 5) PAGINATION
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1 ) * limit;
        // query = query.skip(skip).limit(limit);
        // if(req.query.page){
        //     const numTours = await Tour.countDocuments();
        //     if( skip > numTours ) throw new Error('This page doesnt exist!');
        // }
        //EXECUTE QUERY
        const feature = new APIFeatures(Tour.find(), req.query)
            .sort()
            .filter()
            .limit()
            .pagination();
        const tours = await feature.query;
        res.status(200).send({
            status: 'success',
            results: tours.length,
            data: tours
        });
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
exports.getTourStates = async (req, res) => {
    try {
        const states = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    //_id: '$ratingsAverage',
                    numTours: { $sum: 1 },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            },
            // {
            //     $match : { _id : { $ne : "EASY" } }
            // }
        ]);
        res.status(200).json({
            status: 'success',
            data: states
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}
exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTours: { $sum: 1 },
                    tours: { $push: '$name' },
                }
            },
            {
                $addFields : { month : '$_id' }
            },
            {
                $project : { _id : 0 }
            },
            {
                $sort : { numTours : -1 }
            },
            {
                $limit : 5
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: plan
        });
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })
    }
}