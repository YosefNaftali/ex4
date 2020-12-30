console.log("--flowers--")
const flowers = require('../models')('flowers');
//console.log("controll-addUser-require('./models')('users');-")

const prompt = require('../prompt');
const timeout = require('../timeout');
(async () => {
    console.clear();
  //  await timeout(500);
   
        let flower = [];
        console.log();
        flower[0] = await prompt("Please enter flower name: ");
        flower[1] = await prompt('Please enter price: ');

     
        console.log(flower);
        try {
            await flowers.UPDATE({
                name: flower[0],
                price:   flower[1],
            
        
            });
            console.log('flower update:' + flower);
        } catch(err) { throw err; }
    
})();
