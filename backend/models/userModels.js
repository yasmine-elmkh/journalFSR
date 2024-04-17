const mongoose = require('mongoose') ;
const {ObjectId} = mongoose.Schema ;

const UserSchema = new mongoose.Schema({
    name : {
        type : String ,
        trim : true ,
        required : true ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ["admin", "journalist", "visiteur", ""]
    }
} , {
    timestamps : true 
})

module.exports = mongoose.model("User" , UserSchema) 