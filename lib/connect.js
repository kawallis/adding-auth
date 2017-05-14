const mongoose = require('mongoose');
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/brews';
mongoose.connect(dbUri);

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('You done close dat shieet');
        process.exit(0);
    });
});