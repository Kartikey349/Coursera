const express =  require("express")
const Course = require("../model/course");
const { Purchased } = require("../model/user");
const userAuth = require("../middleware/auth");
const courseRouter = express.Router()


courseRouter.get("/preview", async(req,res) => {
    try{
        const courses = await Course.find({});
        res.send(courses)
    }catch(err){
        res.send("ERROR: " + err.message)
    }
})


courseRouter.get("/purchased", userAuth, async(req,res) => {
    const user = req.user
    try{
        const purchased = await Purchased.find({
            userId: user._id
        }).populate("courseId", "title price description")
        res.send(purchased)
    }catch(err){
        res.send("ERROR: "+ err.message)
    }
})



module.exports = courseRouter