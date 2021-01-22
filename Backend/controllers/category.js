const Category=require("../models/category")


exports.getCategoryById=(req,res,next,id)=>{
       Category.findById(id)
        .exec((err,cate)=>{
            if(err){
                return res.status(400).json({
                    error:"category not found"
                })
            }

            req.category=cate
            next()
        })
}
exports.createCategory=(req,res)=>{

    const category= new Category({
        name:req.body.name,
       // user:req.profile._id
    })
    category.save((err,category)=>{
            if(err){
                return res.status(400).json({
                    error:"not able to solve in database"
                })
            }
            return res.json({category})
    })
    

}

exports.getCategory=(req,res)=>{

/*Category.findOne({name:req.category.name})
.populate('user')
.exec((err,data)=>{
    if(err){
        return res.json({
            message:"error"
        })
    }
    return res.json(data)
})
*/
    return res.json(req.category)

}
exports.getAllCategory=(req,res)=>{
    Category.find()
    .exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"not able to solve in database"
            })
        }
        return res.json(category)
    })

}

exports.updateCategory=(req,res)=>{
    const category=req.category

    category.name=req.body.name

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"failed to update"
            })
        }
        return res.json(updatedCategory)

    })
}

exports.deleteCategory=(req,res)=>{
    const category=req.category
    category.remove((err)=>{
        if(err) return res.status(400).json({
            errror:"error during delete"
        })
        return res.json({
            message:"successfully deleted",
        })
    })


}
