const express=require("express")
const router=express.Router()
const { body } = require('express-validator');
const {SignOut,SignIn,SignUp,isSignedIn}=require("../controllers/auth")




router.post("/signup",[
    body('name',"name sholud be at least 3 character").isLength({min:1}),
    body('email',"email  required").isEmail(),
    body('password').isLength({ min: 3 })

], SignUp)

router.post("/signin",[
    body('email',"email  required").isEmail(),
    body('password',"password shuld be strong").isLength({ min: 3 })

], SignIn)

router.get("/signout",SignOut)
router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})

module.exports=router;