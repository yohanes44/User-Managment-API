

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   
    FullName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
    
});


module.exports = mongoose.model('User', UserSchema);
