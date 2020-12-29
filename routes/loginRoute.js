
var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')
const loginControll = require('../controlles/loginControll')

//Login users
router.post('/login',loginControll.login);
  

 module.exports = router;
  