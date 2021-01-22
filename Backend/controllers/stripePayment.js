const stripe=require('stripe')("sk_test_51IBe1vLYFcN7WZEZSdH6lPusVKMUNSTGSETDXBHwbefqFNDcnPVFxMxDRxIcyUkkLoUEWP0CPKiIp15HXuVD38BG004sDJGz5X")
const {v4:uuidv4}=require('uuid');

exports.makePayment=(req,res)=>{
   // console.log(req.body.products)
   const {products,token}=req.body
    console.log(products)
    console.log(token)


}