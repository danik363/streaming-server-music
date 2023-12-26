const bodyParser = require('body-parser');
const express = require('express');
const router  = require('./network/router.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);

module.exports = app;