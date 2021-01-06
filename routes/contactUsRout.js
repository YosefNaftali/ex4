var express = require('express');
var router = express.Router();
const contactUsControll = require('../controlles/contactUsControll')
/* GET contactUs page. */
router.get('/contactUs', contactUsControll.contactUs);

module.exports = router;




