'use strict'

/*Import all the necessary modules to make the API*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config');
const routes = require('./routes/userRoutes/userRoutes');
const app = express();
mongoose.connect(dbConfig.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*start the app */
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

app.use('/api', routes);

let port = 1234;

app.listen(port, ()=>{
    console.log('Server is up and running on ' + port)
})
