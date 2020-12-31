
console.log("controll-remove--")
const User = require('../models')('users');
//console.log("controll-addUser-require('./models')('users');-")

const prompt = require('../prompt');
const timeout = require('../timeout');
(async () => {
    console.clear();
    await timeout(500);
    while (true) {
        let user = [];
        console.log();
        user[0] = await prompt("Please enter user's id to remove : ");
        console.log(user);
        try {
            await User.DELETE({
                
                id:   user[0]
        
            });
            console.log('User removed:' + user);
        } catch(err) { throw err; }
    }
})();
