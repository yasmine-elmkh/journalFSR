const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema ;

const CategorySchema = new mongoose.Schema({
    title :{
        type:String,
        trim : true , 
        required : true ,
    }
},{
    timestamps : true
})
module.exports=mongoose.model("Category" , CategorySchema)