//td
let users = require('../data/users');
let branches = require('../data/branches');
//

const branchManagement= (req,res)=>{
    if(req.query){
        let user = users.find((user)=>user.userName == req.query.user);
        if(user&&(user.type === 'manager' ||user.type === 'Manager' )){
     
            res.render('branch', {branches:branches})
    
        }
      }else{
        res.redirect ('home');
      }

}
const getBranches=(req,res)=>{
    setTimeout(() => {
        res.send(branches);
      }, 1000);
}


module.exports={
branchManagement,
getBranches
}