const Product=require("../models/product")
const fromidable=require("formidable")
const _=require("lodash")
const fs=require("fs")
exports.getProductById=(req,res,next,id)=>{
            Product.findById(id)
            .populate("category")
            .exec((err,data)=>{
                if(err){
                    return res.status(400).json({
                        error:"error during geting  product Id"
                    })
                }
                    req.product=data
                next()
            })
}

exports.createProduct=(req,res)=>{
    let form =new fromidable.IncomingForm()
    form.keepExtensions =true
    form.parse(req,(err,fields,file)=>{
        if(err) return res.status(400).json({error:"problem with Image"})
        

        const {name,description,price,category,stock}=fields
        
        if(!name ||
            !description ||
            !price ||
            !category ||
            !stock 
            )
        {
            return res.status(400).json({
                error:"please include all fields"
            })
        }

        let product=new Product(fields)

         //handle file
         if(file.photo){
             if(file.photo.size >3000000){
                 return res.status(400).json({error:"file size big"})
             }
             product.photo.data=fs.readFileSync(file.photo.path)
             product.photo.contentType=file.photo.type
         }
         //save to db
         product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"saving in db is failed"
                })
            }
            return res.json(product)
         })
    })
}


exports.getProduct=(req,res)=>{
    req.product.photo=undefined
        return res.json(req.product)
}

exports.photo=(req,res,next)=>{
        if(req.product.photo.data){
            res.set("Content-Type",req.product.photo.contentType)
            return res.send(req.product.photo.data)
        }
        next()
}


exports.updateProuduct=(req,res)=>{
    let form =new fromidable.IncomingForm()
    form.keepExtensions =true
    form.parse(req,(err,fields,file)=>{
        if(err) return res.status(400).json({error:"problem with Image"})
        

        

        let product= req.product
            product=_.extend(product,fields)
         //handle file
         if(file.photo){
             if(file.photo.size >3000000){
                 return res.status(400).json({error:"file size big"})
             }
             product.photo.data=fs.readFileSync(file.photo.path)
             product.photo.contentType=file.photo.type
         }
         //save to db
         product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"updation in db is failed"
                })
            }
            return res.json(product)
         })
    })
}



exports.deleteProduct=(req,res)=>{
    let product=req.product
    product.remove((err)=>{
        if(err) return res.status(400).json({
            errror:"error during delete"
        })
        return res.json({
            message:"successfully deleted",
        })
    })
}

exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):8
    let sortBy=req.query.sortBy ?req.query.sortBy:"_id"
    Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy,"asc"]])
    .limit((limit))
    .exec((err,data)=>{
        if(err) return res.status(400).json({
            errror:"no product found"
        })
        return res.json(data)
    })
}

//used in front end
exports.updateStock=(req,res,next)=>{
    let myOperation=req.body.order.produt.map(prod=>{
                 return {
                     updateOne:{
                         filter:{_id:prod._id},
                         update:{$inc:{stock:-prod.count,sold:+prod.count}}
                     }
                 }
    })
    Product.bulkWrite(myOperation,{},(err,product)=>{})
    if(err){
        return res.status(400).json({
            error:"bulk operation failed"
        })
    }
    next()
}

exports.getAllUniquesCategories=(req,res)=>{
            Product.distinct("category",{},(err,cate)=>{
                if(err){
                    return res.status(400).json({
                        error:"no category found "
                    })
                }
                res.json(category)
            })
}