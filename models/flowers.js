const debug = require("debug")("mongo:model-flower");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: { type: String, required: true },
        price: { type: String, required: true },
        picture: { type: String, required: false },// picture now is a relative pass like "images\\Lili.jpg"
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

    schema.statics.CREATE = async function (flower) {
        return this.create(flower);
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

    schema.statics.UPDATE = async function (flower) {
        console.log("flower to update: ", flower);
        let flowersss = this.findOneAndUpdate({name: flower.name },  
            flower, null, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Original flower : ",docs); 
            } 
        }); 
    };

    schema.statics.DELETE = async function (flower) {
      let item = this.findOneAndDelete({name: flower.name}, function (err, docs) { 
         if (err){ 
             console.log(err) 
           } 
         else{ 
            console.log("Deleted flower : ", docs); 
        } 
        }); 
    
    }

    db.model('flowers', schema);
    debug("Flower model created");
};