const { ObjectID } = require("mongodb");
const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;
const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product",
    },
    name:String,
    count:Number,
    price:Number
})
const ProductCart=mongoose.model("ProductCart",ProductCartSchema)


const OrderSchema=new mongoose.Schema({
    product:[ProductCartSchema],
    transaction_Id:{},
    amount:{
        type:Number
    },
    address:String,
    updated:Date,
    user:{
        type:ObjectID,
        ref:"User"
    }
},{timestamps:true})


const Order=mongoose.model("Order",OrderSchema)

module.exports={Order,ProductCart}