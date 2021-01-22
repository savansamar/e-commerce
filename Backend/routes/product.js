const express=require('express')
const router=express()
const {getUserById}=require("../controllers/user")
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth")
const {getCategoryById}=require("../controllers/category.js")
const {getProductById,createProduct,getProduct,photo,updateProuduct,deleteProduct,getAllProducts,getAllUniquesCategories}=require("../controllers/product")

router.param("userId",getUserById)
router.param("productId",getProductById)
router.post("/create/product/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.put("/update/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProuduct)
router.delete("/delete/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.get("/products",getAllProducts)
router.get("/products/categories",getAllUniquesCategories)

module.exports=router;