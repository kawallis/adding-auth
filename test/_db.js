const connection = require('mongoose').connection;
process.env.MONGODB_URI ='mongodb://localhost:27017/brews-test';
require('../lib/connect');
module.exports = {
    drop() {
        return connection.dropDatabase();
    }
}; 