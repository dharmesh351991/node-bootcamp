const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have name!'],
        unique: true,
        trim: true,
        minlength : [10, 'The tour name must consist of at least 40 characters.'],
        maxlength : [100, 'The tour name must not surpass 100 characters.']
    },
    slug: String,
    secretTour : {
        type : Boolean,
        default : false
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have duration!']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have group size!']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have difficulty!'],
        enum : {
            values : ['easy', 'medium', 'difficult'],
            message : 'Difficulty is either: easy, medium, difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min : [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQunatity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price!'],
    },
    priceDiscount: {
        type : Number,
        validate :{
            validator : function(val){
                return val < this.price
            },
            message : 'Discount price ({VALUE}) should be less than Regular price!'
        } 
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have cover image!'],
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false //optional to Hide specific filed from results
    },
    startDates: [Date]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});
//DOCUMENT MIDDLEWARE WILL RUN BEFORE .SAVE() and .CREATE() methods
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
// tourSchema.post('save', function (doc, next) {
//     console.log('MIDDLEWARE OF POST SAVE MONGOOSE');
//     next();
// });
// tourSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// });
//QUERY MIDDLEWARE
//tourSchema.pre('find', function(next){
tourSchema.pre(/^find/, function(next){
    this.start = Date.now();
    this.find({ secretTour : { $ne : true } });
    next();
})
tourSchema.post(/^find/, function(doc, next){
    console.log(`The query has taken time of ${Date.now() - this.start} milliseconds!`);
    next();
});
//AGGREGATE MIDDLEWARE
tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match : { secretTour: { $ne : true } } })
    next();
})
const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;