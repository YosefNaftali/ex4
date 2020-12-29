console.log("--addUser--")
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
        user[0] = await prompt("Please enter user's name: ");
        user[1] = await prompt('Please enter user id: ');
        user[2] = await prompt('Please enter user type: ');
        user[3] = await prompt('Please enter branchName:: ');
        user[4] = await prompt('Please enter userName:: ');
        user[5] = await prompt('Please enter password:: ');
        user[6] = await prompt('Please enter valid:: ');
        let admin = await prompt('Please enter admin status: ');
        user[7] = admin == 'Y' || admin == 'y';
        console.log(user);
        try {
            await User.CREATE({
                name: user[0],
                id:   user[1],
                type: user[2],
                branchName: user[3],
                userName: user[4],
                password: user[5],
                valid:    user[6],
        
            });
            console.log('User created:' + user);
        } catch(err) { throw err; }
    }
})();
