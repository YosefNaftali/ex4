const debug = require("debug")("mongo:model-flower");
const mongo = require("mongoose");

module.exports = db => {
        // create a schema
        let schema = new mongo.Schema({
            branchCity: { type: String, required: true },
            number: { type: String, required: true },
            phone: { type: String, required: false },
            active: { type: String, required: false },
            created_at: Date,
            updated_at: Date
        }, { autoIndex: false });

         // on every save, add the date
    schema.pre('save', function (next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });

    schema.statics.CREATE = async function (branch) {
        return this.create(branch);
    };

schema.statics.REQUEST = async function () {
    const args = Array.from(arguments);
    if (args.length === 0) {
        debug("request: no arguments - bring all at once");
        return this.find({}).exec();
    }

    let callback = arguments[arguments.length - 1];
    if (callback instanceof Function) {
        let asynch = callback.constructor.name === 'AsyncFunction';
        debug(`request: with ${asynch ? 'async' : 'sync'} callback`);
        args.pop();
        let cursor, Flower;
        try {
            cursor = await this.find(...args).cursor();
        } catch (err) { throw err; }
        try {
            while (null !== (Flower = await cursor.next())) {
                if (asynch) {
                    try {
                        await callback(Flower);
                    } catch (err) { throw err; }
                }
                else {
                    callback(Flower);
                }
            }
        } catch (err) { throw err; }
        return;
    }

    if (args.length === 1 && typeof args[0] === "string") {
        debug("request: by ID");
        return this.findById(args[0]).exec();
    }

    debug(`request: without callback: ${JSON.stringify(args)}`);
    return this.find(...args).exec();
};

schema.statics.UPDATE = async function (branch) {
    console.log("branch to update: ", branch);
    let branchhh = this.findOneAndUpdate({number: branch.number},  
        branch, null, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Original branch : ",docs); 
        } 
    }); 
};

schema.statics.DELETE = async function (branch) {
    let item = this.findOneAndDelete({number: branch.number}, function (err, docs) { 
       if (err){ 
           console.log(err) 
         } 
       else{ 
          console.log("Deleted branch : ", docs); 
      } 
      }); 
  
  }


    db.model('branches', schema);
    debug("branches model created");
}