const express = require("express");
const userRouter = express.Router()
const signupValidation = require("../utils/validator")
const {User, Purchased} = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userAuth = require("../middleware/auth");
const Course = require("../model/course");

userRouter.post("/signup", async(req,res) => {
   const {
        firstName,
        emailId,
        password
    } = req.body

    try{

        signupValidation(req);

        const existingUser = await User.findOne({
            emailId: emailId
        })
    
        if(existingUser){
            throw new Error("Email already Exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
            firstName,
            emailId,
            password: hashedPassword
        })

        await user.save();
        res.send("Successfully Signed Up")

    }catch(err){
        res.status(500).send("ERROR: " + err.message)
    }

})


userRouter.post("/login", async(req,res) => {
    const {
        emailId,
        password
    } = req.body;

    try{
        const user = await User.findOne({
            emailId: emailId
        })

        if(!user){
            throw new Error("No user find, Signup now")
        }

        const loggedInUser = await bcrypt.compare(password, user.password);

        if(loggedInUser){
            const token =  jwt.sign({id: user._id}, process.env.JWT_KEY)
            res.cookie("token", token)
        }else{
            throw new Error("Wrong password")
        }

        res.send("Login successfull")

    }catch(err){
        res.status(501).send("ERROR: " + err.message)
    }
})


userRouter.post("/purchase", userAuth, async (req, res) => {
    const user = req.user;

    const {
        courseId
    } = req.body

    try{
        const course = await Course.findById(courseId);
        
        if(!course){
            throw new Error("course does not exist");
        }


        const purchased = await Purchased.findOne({
            userId: user._id,
            courseId
        })
        if(purchased){
            throw new Error("already purchased course")
        }


        const coursePurchase = new Purchased({
            userId: user._id,
            courseId,
            creatorId: course.creatorId
        })


        await coursePurchase.save();

        const populatedPurchase = await Purchased.findById(coursePurchase._id)
        .populate("courseId", "title description price")
        .populate("userId", "firstName emailId")

        res.send(populatedPurchase);

    }catch(err){
        res.status(404).send("ERROR: "+ err.message)
    }
})

module.exports = userRouter;