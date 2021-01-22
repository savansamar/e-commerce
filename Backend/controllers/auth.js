const User=require("../models/user")
const { body, validationResult, check } = require('express-validator');
var jwt = require('jsonwebtoken');
var extJwt=require('express-jwt');
const user = require("../models/user");


exports.SignUp= (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
           // error: errors.array()[0].param,
            error: errors.array()[0].msg

        })

    }

    const user = new User(req.body)
    user.save((err,user)=>{
         if(err){
             return res.status(400).json({
                     error:"error during saving"
             })
         }
         //r es.json(user)
          res.json({
             name:user.name,
             email:user.email,
             id:user._id
         })
    })
    
}

// sign in
exports.SignIn=(req,res)=>{
    const {email,password}=req.body
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
           // error: errors.array()[0].param,
            error: errors.array()[0].msg

        })}

    User.findOne({email},(err,user)=>{
        
        if(err|| !user){
            return res.status(400).json({
                error:"user doesn't exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"wrong password"
            })

        }

    const token=jwt.sign({_id:user._id},"!hero@No#One@")
        //Y
        //console.log(token)
        res.cookie("token",token,{expire:new Date() + 9999});
        //below user go to frontend 
        const {_id,name,email,role}=user;
        return res.json({
            token,
            user:{
                _id,name,email,role
            }
        })
        
    })
}

//signOut
exports.SignOut=(req,res)=>{
    //clear token
    res.clearCookie("token")
    res.json({
        message:"user signout successfully"
    })
   
}


//protected routes

exports.isSignedIn=extJwt({
    /// next() should be use but express-jwt auto  uses of next()
    secret:"!hero@No#One@",
    //this auth is id of user
    userProperty:"auth",
    algorithms:['HS256']

})

//custom middlewear
exports.isAuthenticated=(req,res,next)=>{
    console.log("ss--",req.profile)
    //req.prfile come from  front
    let checker=req.profile && req.auth && req.profile._id == req.auth._id
        if(!checker){
            return res.status(403).json({
                error:"Access Denied"
                //use next() there if you pass id in url like("/prodct/:productId")
                //but you use it another type of middlewera
            })
        }
    next()
}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"you are not admin"
        })
    }
    
    next()
}