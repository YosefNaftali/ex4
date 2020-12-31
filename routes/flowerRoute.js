var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')
const flowerControll = require('../controlles/flowerControl')
var formidable = require('formidable');

// simcha : const formidable = require('express-formidable');
//router.use( formidable());

//get catalog page
router.get('/catalog' ,flowerControll.catalog);
  //Get catalog
router.get('/getcatalog',flowerControll.getCatalog);
//add flower
router.post('/addFlower',flowerControll.addFlower);

 module.exports = router;