var express = require('express');
var router = express.Router();
const aboutConteroll = require('../controlles/aboutConteroll');

/* GET users listing. */
router.get('/about', aboutConteroll.about);

module.exports = router;
