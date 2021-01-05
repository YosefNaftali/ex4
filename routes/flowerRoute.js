var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')
const flowerControll = require('../controlles/flowerControl')

const multer = require('multer');

let path = '../public/images';

//get catalog page
router.get('/catalog' ,flowerControll.catalog);
  //Get catalog
router.get('/getcatalog',flowerControll.getCatalog);

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\tar4\\lab5\\public\\images')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.Description +".jpg")
  }
})
 
var upload = multer({ storage: storage })

//add flower
router.post('/uploadfile',upload.single('myFile'), flowerControll.addFlower);


 module.exports = router;