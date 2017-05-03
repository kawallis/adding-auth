const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        require: true
    },
    roles: [{
        type: String,
        enum: ['admin', 'super-user']
    }],
    favbrews: [{
        type: Schema.Types.ObjectId,
        ref: 'Brew'
    }]
});

module.exports = mongoose.model('User', schema);