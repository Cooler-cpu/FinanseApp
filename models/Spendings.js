const {Schema, model, Types, mongoose} = require('mongoose');

const SchemaSpends = new Schema({ 
    spendsBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    SpendingsData: [{
        date: Date,
        cost: Number,
        category: String,
        note: String

    }]
})

module.exports = model('Spendings', SchemaSpends)