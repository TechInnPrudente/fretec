
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//conecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true });

//carrega os models
const Customer = require('./models/mcustomer');
const Employee = require('./models/memployee');
const Order = require('./models/morder');
const Product = require('./models/mproduct');
const Scheduling = require('./models/mscheduling');

//carrega as rotas
const rindex = require('./routes/rindex');
const rprod = require('./routes/rproduct');
const rcust = require('./routes/rcustomer');
const rempl = require('./routes/remployee');
const rorde = require('./routes/rorder');

app.use( bodyParser.json( {limit: '5mb'} ) );
app.use( bodyParser.urlencoded( {extended: false} ) );

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', rindex);
app.use('/products', rprod);
app.use('/customers', rcust);
app.use('/employees', rempl);
app.use('/orders', rorde);

module.exports = app;