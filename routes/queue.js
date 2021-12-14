const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Queue = require('../models/rs');

const Pasien = require('../models/pasien')

router.use(validateJWT);

//All Queues
router.get('/', async (req, res) => {
    try {
        const listQueue = await Queue.find();
        res.json({ok: true, data: listQueue});
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
})

//One Queue
router.get('/:id', getQueueByID, async (req, res) => {
    res.json({ok: true, data: res.antrian});
})

//Create Queue
router.post('/', async (req, res) => {
    const {nama, dokter, max} = req.body;
    const queue = new Queue({nama, dokter, max});
    try {
        const newQueue = await queue.save();
        res.status(201).json({ok: true, data: newQueue});
    } catch (err) {
        res.status(400).json({ok: false, message: err.message});
    }
})

//Front
router.get('/:id/front', getQueueByID, (req, res) => {
    res.json({ok: true, data: res.antrian.queue[0]});
})

//Insert
router.post('/:id', getQueueByID, async (req, res) => {
    try {
        res.antrian.queue.push(req.user._id);
        const newQueue = await res.antrian.save();
        res.status(201).json({ok: true, data: newQueue});
    } catch (err) {
        res.status(400).json({ok: false, message: err.message});
    }
})

//Delete Front
router.delete('/:id', getQueueByID, (req, res) => {
    try {
        res.queue.remove();
        res.json({ok: true, deleted_data: res.queue});
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
})

//Update status pasien
router.get('/status/:id', async (req, res) => {
    try {

        pasien = await Pasien.findById(req.params.id)
        if(queue == null) {
            return res.status(404).json({ok: false, message: 'Queue not Found'})
        }
        console.log(pasien)
        pasien.findByIdAndUpdate(req.params.id, {$set: {idStatus : 1}})
        pasien++;
        pasien.save()
        res.status(200).json({ok: true, message: 'Berhasil Ditambahkan'})
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }

})

async function getQueueByID(req, res, next) {
    let queue;
    try {
        queue = await Queue.findById(req.params.id);
        if(queue == null) {
            return res.status(404).json({ok: false, message: 'Queue not Found'})
        }
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
    res.antrian = queue;
    next();
}



function validateJWT(req, res, next) {
    let user;
    try {
        user = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ok: false, message: err.message});
    }
    req.user = user;
    next();
}

module.exports = router;