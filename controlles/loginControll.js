//td
// let users = require('../data/users');
//
 const User = require('../models')("users"); 


const login= async(req,res)=>{
  
    try{
      let users= await User.REQUEST();
      
      let userName = users.find( ({userName}) => userName == req.body.userName);
      if(!userName){
        console.log("User Name Not Exsist")
        res.status(401).send({
          message:'User Name Not Exsist'
        })
      }else if(userName.password !== req.body.password){
        console.log("Wrong Password")
        res.status(409).send({
          message:'Wrong Password'
        });
      }else{
        console.log("finde userName and password in DB")
       res.send({
          message:'Succesfull',
          type: userName.type //
          });
      }
    }catch (err) { debug(`Failed: ${err}`) }
    
/*
    let userName = users.find( ({userName}) => userName == req.body.userName);
    if(!userName){
      res.status(401).send({
        message:'User Name Not Exsist'
      })
    }else if(userName.password !== req.body.password){
      res.status(409).send({
        message:'Wrong Password'
      });
    }else{
     res.send({
        message:'Succesfull',
        type: userName.type
        });
    }
    */
}


module.exports={
    login
}