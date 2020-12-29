var express = require('express');
var router = express.Router();
const Error404Controll = require('../controlles/error404Controll');

router.get('/Error404',Error404Controll.Error404);

module.exports = router;


