const mongoose = require('mongoose');
const Agency = require('../models/AgencyClient');

const ClientSchema = new mongoose.Schema({
    AgencyId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Agency
    },
    ClientId:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    TotalBill:{
        type: Number,
        required: true
    }
},{collection:"clients"});

module.exports = mongoose.model('Client',ClientSchema);