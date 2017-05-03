const app = require('./lib/app');
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server running on', server.address());
});



const mongoose = require('mongoose');
mongoose.Promise = Promise;
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/brews';
mongoose.connect(dbUri);

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('You done close dat shieet');
        process.exit(0);
    });
});

