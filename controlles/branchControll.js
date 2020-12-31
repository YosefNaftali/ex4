//td
// let users = require('../data/users');
// let branches = require('../data/branches');
//

const debug = require("debug")("mongo:listusers");
const User = require('../models')("users");  
const branches = require('../models')("branches"); 


const timeout = require("../timeout");


const branchManagement= async (req,res)=>{
    if(req.query){

      try{
       let users= await User.REQUEST();
       let user = users.find((user)=>user.userName == req.query.user && user.password == req.query.pass );
       if(user&&(user.type === 'manager' ||user.type === 'Manager' )){
        let allBranches= await branches.REQUEST();
        res.render('branch', {branches:allBranches})

       }
      else{
      console.log("user not found or password")
      res.redirect ('home');
      }

      }catch (err) { debug(`Failed: ${err}`) }

      }else{
        res.redirect ('home');
      }

}


const getBranches= async (req,res)=>
{
  try
  {
      setTimeout(async() =>
      {
      let allBranches= await branches.REQUEST();
      res.send(allBranches);
      }, 1000);
  }
  catch (err) { debug(`Failed: ${err}`) }
}


module.exports={
branchManagement,
getBranches
}