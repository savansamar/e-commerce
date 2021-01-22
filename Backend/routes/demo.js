const express=require("express")
const router=express.Router()
const {createPerson,Save,getAll,getID,storyId}=require("../controllers/demo")




router.param("getID",getID)
router.post("/create",createPerson)

router.param("getStory",storyId)

router.post("/getDemo/:getID",Save)
router.get("/getAll/:getStory",getAll)






module.exports=router
