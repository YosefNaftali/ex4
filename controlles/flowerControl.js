const debug = require("debug")("mongo:listusers");
const User = require('../models')("users"); 
const flowers = require('../models')("flowers"); 


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
    
    console.log("req.file:")
    console.log(req.file)
    console.log("req.body: ",req.body)
    let flower = {
      name : req.body.Description,
      price :req.body.Price, 
      picture : 'images\\'+req.body.Description +".jpg",      

    }
    console.log("the item to DB: ",flower)
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    
    await flowers.create(flower);
    console.log("im done adding ");
    res.status(200).send({message:'Success'});
    console.log("im done adding and send response");
  }catch (err) { debug(`Failed: ${err}`) }
   
}


module.exports={
catalog,
getCatalog,
addFlower
}