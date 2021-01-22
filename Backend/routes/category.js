const express=require("express")
const router=express.Router()
const {getUserById,getUser,updateUser,UserPurchaseList,use}=require("../controllers/user")
const {isSignedIn,isAdmin,isAuthenticated}=require("../controllers/auth")
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory,pop}=require("../controllers/category.js")

router.param("userId",getUserById)
router.param("categoryId",getCategoryById)
//create
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)


router.put("/category/update/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete("/category/delete/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports=router