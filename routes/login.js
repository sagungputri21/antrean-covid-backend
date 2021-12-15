const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Dokter = require('../models/dokter');
const Pasien = require('../models/pasien');

//register
router.post('/register', async (req, res) => {
  const { nama, nik, email, password, dokter } = req.body;
  const user = dokter ? new Dokter({ email, password, nama, nik }) : new Pasien({ email, password, nama, nik });
  try {
    bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS), async (err, hash) => {
      if(err) console.log('Hashing error', err);
      user.password = hash;
      const newUser = await user.save();
      res.status(201).json({ ok: true, data: newUser });
    });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
});

//login
router.post('/login', async (req, res) => {
  const {email, password, dokter} = req.body;
  
  const user = dokter ? await Dokter.findOne({email}) : await Pasien.findOne({email});
  if(!user) return res.status(401).json({ok: false, message: 'Email or Password is incorrect!'});
  
  const validated = await bcrypt.compare(password, user.password);
  if(!validated) return res.status(401).json({ok: false, message: 'Email or Password is incorrect!'});
  
  const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn: '1h'});
  res.json({ok: true, message: 'Logged In', token});
});

module.exports = router;
