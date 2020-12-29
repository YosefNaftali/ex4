var express = require('express');
var router = express.Router();

const debug = require('debug')('mongo:mongo')
//////----------------mongoose + schema------------------------//////////////

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var Schema= mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoDb is started")
  // יצירת סכמה
  var myUserSchema= new Schema({name: String, id: String, type: String, branchName: String, userName:String, password:String, valid:String  })
  // יצירת מודל (אוסף) מקבל את שם האוסף ואת הסכמה
  var usersModel= mongoose.model("users", myUserSchema);
 //שימוש במודל על מנת לקבל את כל האוסף ובפונקצית הקולבאק מדפיס אותו
  usersModel.find({}, function(err, result){
    console.log(result);
    console.log("print here the users if was finde");
    debug("On open DB") 
    debug("On open DB") 
    debug("On open DB") 

  })
  // we're connected!
});
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
