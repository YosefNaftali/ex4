var express = require('express');
var router = express.Router();
const debug = require('debug')('mongo:mongo')
const flowerControll = require('../controlles/flowerControl')
//simcha: var formidable = require('formidable');
// simcha : const formidable = require('express-formidable');
// router.use( formidable());
let multer = require('multer');
let fs = require("fs");
//let download = require('image-downloader');
let path = '../public/images';
let storage1 = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'C:');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});
const upload = multer({
  storage: storage,
  dest: 'uploads/'});
//from website-israel//////////////////////////////////////////
/* const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/images');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, "ma ma ma ");
  }
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image.', 400), false);
  }
};
/* const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
}); */ 
/////////////////////////////////////////////////////////////
//let upload = multer({ storage: multerStorage });
//simcha: var formidable = require('formidable');

const User = require('../models')("users"); 
const flowers = require('../models')("flowers"); 

//get catalog page
router.get('/catalog' ,flowerControll.catalog);
  //Get catalog
router.get('/getcatalog',flowerControll.getCatalog);

//add flower
router.post('/addFlower',upload.single('file'), async function (req, res) {
  try {
      let body = req.body;
      let url = body.ImageUrl;
      let file = req.file;

     console.log("1 req.body",body)
     console.log("2 body.ImageUrl",url)
     console.log("3 req.file",file)
     if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
      
  } catch (err) { // TODO: send the error message and show it to the user...
      console.log(err.message);
      res.status(500).send(err.message);
  }
});

 module.exports = router;