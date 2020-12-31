console.log("--branches--")
const flowers = require('../models')('branches');
//console.log("controll-addUser-require('./models')('users');-")

const prompt = require('../prompt');
const timeout = require('../timeout');
(async () => {
    console.clear();
    await timeout(500);
    while (true) {
        let flower = [];
        console.log();
        flower[0] = await prompt("Please enter branchCity : ");
        flower[1] = await prompt('Please enter numberID: ');
        flower[2] = await prompt('Please enter phone: ');
        flower[3] = await prompt('Please enter active: ');

     
        console.log(flower);
        try {
            await flowers.CREATE({
                branchCity: flower[0],
                number:   flower[1],
                phone: flower[2],
                active:   flower[3],
            
        
            });
            console.log('branch created:' + flower);
        } catch(err) { throw err; }
    }
})();
