const express = require('express');
const nodemon = require('nodemon');
const cors = require('cors');
require('dotenv').config();
const encodeDecodeR = require('./routers/encodedecodeR');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', encodeDecodeR.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server started ' + PORT);
});

