var express=require("express")
const router=express.Router();
var  managementModule=require("../module/management");

router.get("/",managementModule.getmentor)
router.post("/mentor",managementModule.creatementor)
router.post("/student",managementModule.createstudent)
router.patch("/studentformentor/:id",managementModule.assignstudent)
router.patch("/mentorforstudent/:id",managementModule.assignmentor)
router.get("/getstudents/:id",managementModule.allstudents)



module.exports=router;