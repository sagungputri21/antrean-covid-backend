require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 80;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error('[Error]', err));
db.once('open', () => console.log('Connected to database'));

app.use(cors());
app.use(express.json());
app.use(logRequest);
app.use(validateAPIKey);

const loginRouter = require('../routes/login.js');
app.use('/auth', loginRouter);

const queueRouter = require('../routes/queue.js');
app.use('/api/queue', queueRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Connected to Server!' });
});

function logRequest(req, res, next) {
  const {headers, body, params, query} = req;
  console.log({headers, body, params, query});
  next();
}

function validateAPIKey(req, res, next) {
  const keyHeader = req.headers.key;
  const key = keyHeader && keyHeader.split(' ')[1];
  if (key != process.env.API_KEY) {
    return res.status(401).json({ ok: false, message: 'Invalid API Key' });
  }
  next();
}

app.listen(port, () => console.log(`Server started on port ${port}!`));
