//to-do: delete this 
//let users = require('../data/users');
//let branches = require('../data/branches');
const branches = require('../models')("branches"); 
//
const debug = require("debug")("mongo:listusers");
const User = require('../models')("users");  


const timeout = require("../timeout");

const addUser = async function(req,res,next){
    console.log("im adding")
    let branchNumber;
    //find free id
   // let i=1;
    let id=0;
    try{
      let users= await User.REQUEST();
      console.log("length: "+users.length);
      console.log("to add this JSON.stringify(req.body): "+JSON.stringify(req.body));
      newUserId=users.length+1;
  
      let user = {
        id:newUserId,
        userName : req.body.userName,
        password :req.body.password, 
        type : req.body.type,      
        name : req.body.name,
        branchName:req.body.branchName,     
        valid:'1'
      }
      console.log("this user we want to add? "+JSON.stringify(user) )
      await User.CREATE(user);
      console.log('User created:' + user);
      //users.push(user);
      res.status(200).send({message:'Success', user:user});
      console.log("im done adding and send");
    }catch (err) { debug(`Failed: ${err}`) }
  
}


const getUsers = async function(req,res,next){
    
    // Inquire all the users at once and get it as an array
    try {
       let tempUsers = await User.REQUEST();
       console.log(tempUsers);
       if(req.query.type == 'manager'||req.query.type == 'Manager'){
        let newUsers = tempUsers.filter((user)=> {return user.valid !=='0'});
        res.send(newUsers);
      }else{
        let newUsers = tempUsers.filter((user)=> {return user.valid !=='0'&& user.type == 'customer'|| user.type == 'Customer'});
        res.send(newUsers);
      }
        //console.dir(users, { showHidden: true, colors: true });
    } catch (err) { debug(`Failed: ${err}`) }

    await timeout(1000);
    /*
    // Inquire the users one-by-one and provide a callback to process each one
    try {
        let index = 0;
        await User.REQUEST(async user => console.log(`Data ${++index}:\n${user}`));
        console.log('Finished');
        process.exit(0);
    } catch (err) { debug(`Failed: ${err}`) }
    process.exit(0);
    */
   
}

const removeUser = async function(req,res,next){
    try {
        await User.DELETE(req.body);
        console.log('User id to remove:' + Object.values(req.body));
    } catch(err) { throw err; }
   console.log(req.body);

  // let user = users.find( ({id}) => id == req.body.userId);
  // user.valid = '0';
 //  res.send({message:'Success'})
}


const updateUser = async function(req,res,next){
 try {
      //  await User.UPDATE(Object.values(req.body));
      await User.UPDATE(req.body);
        console.log('User to update:'+ JSON.stringify(req.body));
    } catch(err) { throw err; }
  console.log(req.body);
}



const usersManagement = async function(req,res,next){
  console.log(req.query);
  if(req.query){
    try{
      let tempUsers = await User.REQUEST();
     // let tempBranches = await  branches.REQUEST();        // TO_DO
    
      console.log(Object.values(req.query));
      console.log(tempUsers);
      console.log(" the number (length) of users: "+tempUsers.length);
      let user = tempUsers.find((user)=>user.userName == req.query.user);
/*
      for(var i = 0; i < tempUsers.length ; i++){
     //   console.log(" cur object in loop : "+tempUsers[i]);
     //   console.log(" cur object to equal in loop : "+req.query.user);

        if (tempUsers[i].userName == req.query.user){
          user=tempUsers[i];
       //   console.log(" res user in loop "+JSON.stringify(user));
       //   console.log(" original in loop "+JSON.stringify(tempUsers[0])) 
        }
      }
      */
      console.log("this is what find() return in DB : ");
      console.log(user);
      console.log("the user type is: "+user.type);
      if(user&&(user.type === 'manager'|| user.type ==='worker' || user.type ==='Manager'||user.type ==='Worker')){
        console.log("I'M in the if------------------------------------- : ");
          let allBranches= await branches.REQUEST();
          res.render('usersManagement',{users:user,branches:allBranches,type:user.type, curUser:user})
      }
      else{
        console.log("there is no muth in DB or type rong")
        res.redirect ('home');
      }
    }catch(err) { throw err; }
   
  }else{
    console.log("need to send user URL parametrs")
    res.redirect ('home');
  }

}
module.exports={
    addUser,
    getUsers,
    removeUser,
    updateUser,
    usersManagement
}
