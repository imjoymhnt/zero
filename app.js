const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRoute = require('./routes/AgencyClients');
require("dotenv").config();
// Connecting to database

const port = process.env.PORT||4000;

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{console.log('DB Connected')})
    .catch((err)=>{console.log(err)});

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message:"API HIT"})
});

app.use('/api',apiRoute);

app.listen(port,()=>{console.log('Server started')});