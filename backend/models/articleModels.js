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
    ref: "User"
},
category:{
    type:ObjectId,
    ref:"Category"
}

},{
    timestamps: true
})

module.exports = mongoose.model("Article" , ArticleSchema) 