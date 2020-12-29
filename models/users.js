/*

*/
const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");

//המודול אמור לייצא פונקציה "ראשית" של המודול שמקבלת בפרמטר את אובייקט הקישור לבסיס הנתונים המתאים
//לכן נגדיר ייצוא מהמודול בצורה הבאה
module.exports = db => {
    //למלא את הקוד של הפונקציה. נתחיל מיצירת הסכימה שלנו עבור המשתמשים
    let schema = new mongo.Schema({
        name:  { type: String, required: true},
        id: { type: String, required: true, unique: true, index: true },
        type: { type: String, required: true },
        branchName: { type: String, required: true },
        userName: { type: String, required: true },
        password: { type: String, required: true },
        valid:    { type: String, required: true },

        created_at: Date,
        updated_at: Date
    }, { autoIndex: false });

    // הרחבה לפונקציה קריאיט של המונגוז
    schema.statics.CREATE = async function(user) {
        console.log("1 user to add "+user.name)
        console.log("2 user to add "+user["name"])
       // console.log("3 user to add "+user[0])
        return this.create(user);
    }

    //הרחבה לפונקציה פיינד נלקח מדן
    //הוסיף למודל פונקציה REQUEST שתטפל במספר מצבים ע"פ הפרמטרים
    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    schema.statics.UPDATE = async function(userToUptate) {
        let user = this.findOneAndUpdate({id: userToUptate.id },  
            userToUptate, null, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Original Doc : ",docs); 
            } 
        }); 
    };
    
    schema.statics.REMOVE = async function(userToUptate) {
        let user = this.findOneAndDelete({id: userToUptate.id}, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Deleted User : ", docs); 
            } 
        }); 
    };


    schema.pre('save', function(next) {
            // get the current date
     let currentDate = new Date();
     // change the updated_at field to current date
     this.updated_at = currentDate;
     // if created_at doesn't exist, add to that field
     if (!this.created_at)
        this.created_at = currentDate;
     next();

    });

    
    

    //הגדרת המודל עם הסכימה שיצרנו
   //אם שם המודל זהה לשם האוסף אז לא צריך לתת פרמטר שלישי עם שם האוסף בניית המודל
    db.model('users', schema); // if model name === collection name
    debug("User model created");

}
           



 