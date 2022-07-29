const mongoose = require('mongoose');
const AgencySchema = new mongoose.Schema({
    AgencyId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    Name:{
        type: String,
        required: true
    },
    Address1:{
        type: String,
        required: true
    },
    Address2:{
        type: String,
    },
    State:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: Number,
        required: true
    },
},
{
    collection:"agencies"
});

module.exports = mongoose.model('Agency',AgencySchema);
