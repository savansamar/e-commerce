    const { ObjectID } = require("mongodb")
const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    },
    /*user:[{
        type:ObjectID,
        ref:"User"
    }]
    */ 
    
   
},{timestamps:true})

module.exports=mongoose.model("Category",categorySchema)






