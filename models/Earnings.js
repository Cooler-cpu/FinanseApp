const {Schema, model, Types, mongoose} = require('mongoose');

const SchemaEarnings = new Schema({ 
    earnBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    EarningsData: [{
        date: {
            type: Date,
            required: true
        },
        cost:{
            type: Number,
            required: true,
            min: 0
        },
        category:{
            type: String,
            required: true
        },
        note:{
            type: String,
            require: true
        } 
    }]
})

module.exports = model('Earnings', SchemaEarnings)