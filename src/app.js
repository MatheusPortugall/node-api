const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//loading routes
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
//app.use('/', route);
app.use('/products', productRoute);

module.exports = app;