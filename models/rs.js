const mongoose = require('mongoose');

const rsSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    dokter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Dokter'
    },
    queue: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Pasien'
        }],
        required: true,
        default: []
    },
    max: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Queue', rsSchema);