const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
        required: true
    },
    location: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Brew', schema);