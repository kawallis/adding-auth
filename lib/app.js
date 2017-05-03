const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

// const auth = require('./routes/auth');
// const brew = require('./routes/brew');


// app.use('/api/auth', auth);
// app.use('/api/brew', brew);

module.exports = app;