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

// TODO//

    db.model('branches', schema);
    debug("branches model created");
}