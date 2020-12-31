//td
// let users = require('../data/users');
// let flowers = require('../data/flowers');
//
var formidable = require('formidable');
const User = require('../models')("users"); 
const flowers = require('../models')("flowers"); 
var fs = require('fs');

const catalog= async (req,res)=>{
  try{
    let users= await User.REQUEST();
    
    let user = users.find((user)=>user.userName == req.query.user);
    if(user){
      res.render('catalog',{curUser:user});
    }else{
      res.redirect ('home');
    }
    
  }catch (err) { debug(`Failed: ${err}`) }
  /*

    let user = users.find((user)=>user.userName == req.query.user);
    if(user){
      res.render('catalog');
    }else{
      res.redirect ('home');
    }
    */
}
const getCatalog= async (req,res)=>{
  try{
    console.log("get catalog")
    let flowerss= await flowers.REQUEST();
    console.log("get catalog step 2, number of items:")
    console.log(flowerss.length)
    res.send(flowerss);
    
  }catch (err) { debug(`Failed: ${err}`) }
   
}

const addFlower= async (req,res)=>{
  try{
    console.log("add flower")
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(files)
      console.log(files.IncomingForm)
    /*   var oldpath = files.filetoupload.path;
      var newpath = 'C:/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      }); */
 });

    /*
function (req, res) {
  
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });
  
}
*/

    console.log( req.fields, '\n', req.files);
    let updatedFlower = req.fields;
    var imageFile = req.files.myImage;
    console.log("files: ", imageFile.size);
    console.log("fields: ", updatedFlower);
/* 
    let users= await User.REQUEST();
    let user = users.find((user)=>user.userName == req.query.user && user.password == req.query.pass );
    console.log(JSON.stringify(req.body))
    console.log(user)
    //console.log(user.type)
    if(req.body && user &&(user.type === 'manager'|| user.type ==='Manager')){
      console.log(req.body)
      let item = {
        name: req.body.name,
        price: req.body.price,
        picture: req.body.picture
      }
      await flowers.create(item)
    }
    else{
      console.log("add flower error - pass||user||req.body")
    }
     */
    
  }catch (err) { debug(`Failed: ${err}`) }
   
}


module.exports={
catalog,
getCatalog,
addFlower
}