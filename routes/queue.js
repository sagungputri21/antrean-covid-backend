const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const Queue = require('../models/rs');
const Pasien = require('../models/pasien');

router.use(validateJWT);

//All Queues
router.get('/', async (req, res) => {
    try {
        const listQueue = await Queue.find().populate('dokter').populate('queue');
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
        if(res.antrian.queue.length == res.antrian.max) return res.status(400).json({ok: false, message: 'Queue is full'});
        res.antrian.queue.push(req.user._id);
        const newQueue = await res.antrian.save();
        res.status(201).json({ok: true, data: newQueue});
    } catch (err) {
        res.status(400).json({ok: false, message: err.message});
    }
})

//Delete Front
router.delete('/:id', getQueueByID, async (req, res) => {
    try {
        res.antrian.queue.shift();
        const newQueue = await res.antrian.save();
        res.json({ok: true, data: newQueue});
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
})

//Update status pasien
router.patch('/status/:id', async (req, res) => {
    let pasien;
    try {
        pasien = await Pasien.findById(req.params.id)
        if(pasien.idStatus == 2){
            return res.status(400).json({ok: false, message: "Sudah vaksin 2 Kali"});
        }
        pasien.idStatus++
        await pasien.save()
        res.json({ok: true, message: 'Berhasil Ditambahkan'})
    } catch (err) {
        res.status(500).json({ok: false, message: err.message});
    }
})

async function getQueueByID(req, res, next) {
    let queue;
    try {
        queue = await Queue.findById(req.params.id).populate('dokter').populate('queue');
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
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) return res.status(401).json({ok: false, message: 'JWT Token must be provided'});
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ok: false, message: err.message});
    }
    req.user = user;
    next();
}

module.exports = router;