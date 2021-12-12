const express = require('express');
const router = express.Router();
const Pasien = require('../models/pasien');

//All
router.get('/', async (req, res) => {
    try {
        const listPasien = await Pasien.find();
        res.json({ok: true, data: listPasien});
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
})

//Front
router.get('/:id', getPasienByID, (req, res) => {
    res.json({ok: true, data: res.pasien});
})

//Insert
router.post('/', async (req, res) => {
    const {nama, nik} = req.body;
    const pasien = new Pasien({nama, nik});
    try {
        const newPasien = await pasien.save();
        res.status(201).json({ok: true, data: newPasien});        
    } catch (err) {
        res.status(400).json({ok: false, message: err.message});
    }
})

//Delete Front
router.delete('/:id', getPasienByID, (req, res) => {
    try {
        res.pasien.remove();
        res.json({ok: true, deleted_data: res.pasien});
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
})

async function getPasienByID(req, res, next) {
    let pasien;
    try {
        pasien = await Pasien.findById(req.params.id);
        if(pasien == null) {
            return res.status(404).json({ok: false, message: 'Pasien not Found'})
        }
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
    res.pasien = pasien;
    next();
}

module.exports = router;