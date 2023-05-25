import mongoose from "mongoose";


const PermissionSchema = new mongoose.Schema({
   
    userID: {
        type: mongoose.Schema.Types.ObjectId
    },
    roleId: {
        type:  mongoose.Schema.Types.ObjectId
    }
    
});


module.exports = mongoose.model('Permission', PermissionSchema);
