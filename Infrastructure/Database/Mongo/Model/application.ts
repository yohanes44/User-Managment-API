import mongoose from "mongoose";


const ApplicationSchema = new mongoose.Schema({
    key: {
        type: String
    },
    ApplicationName: {
        type: String
    },
    Address: {
        type: String
    }
});


module.exports = mongoose.model('Application', ApplicationSchema);
