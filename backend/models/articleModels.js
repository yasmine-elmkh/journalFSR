const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema ;


const ArticleSchema = new mongoose.Schema({
    title :{
        type:String,
        trim : true ,  
        required : true ,
    },
    description:{
        type : String ,
        required : true ,
        trim : true
    },
    owner: {
        type: ObjectId,
        ref: "User",
        require: true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        require: true
    },
    image: {
        type: String,
        trim: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Article" , ArticleSchema) 