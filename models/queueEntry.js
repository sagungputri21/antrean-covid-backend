const mongoose = require('mongoose');

const queueEntrySchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    nik: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('QueueEntry', queueEntrySchema);