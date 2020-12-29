//td
let users = require('../data/users');
let branches = require('../data/branches');
//
const about=(req,res)=>{
    console.log("bring about");
    res.render('about');
}


module.exports={
about
}