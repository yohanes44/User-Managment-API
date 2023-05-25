

import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
   
    appId: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    }
    
});


module.exports = mongoose.model('Role', RoleSchema);
