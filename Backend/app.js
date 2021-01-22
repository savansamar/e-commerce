const express=require('express')
const bodyParser = require('body-parser')
const app=express()
require("dotenv").config()
const cookieParser=require('cookie-parser')
const cors=require("cors")


const port=4000
const mongoose = require('mongoose');

//routes
const authRoutes=require("./routes/auth.js")
const userRoutes=require("./routes/user.js")
const cateRoutes=require("./routes/category.js")
const proRoutes=require("./routes/product.js")
const ordRoutes=require("./routes/order.js")
const stripeRoutes=require("./routes/stripePayment.js")

const demo=require("./routes/demo.js")





mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    console.log("DB Connected")
}) 

//Middelwear
app.use(bodyParser.json())

app.use(cookieParser())
app.use(cors())


//Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",cateRoutes)
app.use("/api",demo)
app.use("/api",proRoutes)
app.use("/api",ordRoutes)
app.use("/api",stripeRoutes)









app.get("/",(req,res)=>{
    res.send("savan")

})

app.listen(port,()=>{

    console.log(`${port} Running`)
})