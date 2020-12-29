//td
// let users = require('../data/users');
// let flowers = require('../data/flowers');
//
const User = require('../models')("users"); 
const flowers = require('../models')("flowers"); 

const catalog= async (req,res)=>{
  try{
    let users= await User.REQUEST();
    
    let user = users.find((user)=>user.userName == req.query.user);
    if(user){
      res.render('catalog');
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


module.exports={
catalog,
getCatalog
}