const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sumSchema = new Schema({
    number1: {
        type: Number,
        required: true,
    },
    number2: {
        type: Number,
        required: true,
    },
    sum: {
        type: Number,
    }
});
const Sum = mongoose.model('Sum', sumSchema);
module.exports = Sum;