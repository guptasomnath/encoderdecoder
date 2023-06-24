const express = require('express');
const encodeDecodeC = require('../controllers/encodedecodeC');
const router = express.Router();

router.get('/chl/:length', encodeDecodeC.createHashList)
.post('/encode', encodeDecodeC.encode)
.post('/decode', encodeDecodeC.decode);

exports.router = router;