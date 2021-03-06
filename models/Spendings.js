const {Schema, model, Types, mongoose} = require('mongoose');

const SchemaSpends = new Schema({ 
    spendsBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    SpendingsData: [{
        date: {
            type: Date,
            required: true
        },
        cost:{
            type: Number,
            required: true
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

module.exports = model('Spendings', SchemaSpends)