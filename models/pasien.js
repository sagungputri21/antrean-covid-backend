const mongoose = require('mongoose');

const pasienSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    nik: {
        type: String,
        required: true
    },
    idStatus: {
        type: Number,
        default : 0,
        max : 2,
        required : true  
    },
})

module.exports = mongoose.model('Pasien', pasienSchema);