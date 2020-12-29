var express = require('express');
var router = express.Router();
const contactUsControll = require('../controlles/contactUsControll')
/* GET home page. */
router.get('/contactUs', contactUsControll.contactUs);

module.exports = router;




