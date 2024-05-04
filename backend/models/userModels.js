const mongoose = require('mongoose') ;
const {ObjectId} = mongoose.Schema ;

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        trim : true ,
        required : true ,
    },
    lastName : {
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
        enum: ["admin", "Journalist", "Visiteur", ""]
    }
} , {
    timestamps : true 
})

module.exports = mongoose.model("User" , UserSchema) 