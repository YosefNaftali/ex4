var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')
const flowerControll = require('../controlles/flowerControl')

//get catalog page
router.get('/catalog' ,flowerControll.catalog);
  //Get users
router.get('/getcatalog',flowerControll.getCatalog);

 module.exports = router;