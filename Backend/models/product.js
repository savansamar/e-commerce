const { ObjectID } = require("mongodb");
const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
name:{
    type:String,
    trim:true,
    trim:true,
    requied:true,
    maxlength:32

},
description:{
    type:String,
    trim:true,
    required:true,
    maxlength:3200
},
price:{
    type:Number,
    required:true,
    trim:true,
    maxlength:32
},
category:{
    type:ObjectID,
    //ref indcate thta from where this object id is comes up
    ref:"Category",
    requied:true
},
stock:{
    type:Number
},
sold:{
    type:Number,
    default:0

},
photo:{
    data:Buffer,
    contentType:String
}

},{timestamps:true})
module.exports=mongoose.model("Product",productSchema)

