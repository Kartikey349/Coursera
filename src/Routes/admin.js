const express = require("express");
const { Admin } = require("../model/user");
const adminRouter = express.Router();
const bcrypt = require("bcrypt")
const signupValidation = require("../utils/validator")
const jwt = require("jsonwebtoken");
const Course = require("../model/course");
const adminAuth = require("../middleware/adminAuth");

adminRouter.post("/signup", async(req,res) => {
    const {
            firstName,
            emailId,
            password
        } = req.body
    
        try{
    
            signupValidation(req);
    
            const existingUser = await Admin.findOne({
                emailId: emailId
            })
        
            if(existingUser){
                throw new Error("Email already Exists")
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const user = new Admin({
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


adminRouter.post("/login", async(req,res) => {
     const {
        emailId,
        password
    } = req.body;

    try{
        const admin = await Admin.findOne({
            emailId: emailId
        })

        if(!admin){
            throw new Error("No user find, Signup now")
        }

        const loggedInUser = await bcrypt.compare(password, admin.password);

        if(loggedInUser){
            const token =  jwt.sign({id: admin._id}, process.env.ADMIN_JWT_KEY)
            res.cookie("token", token)
        }else{
            throw new Error("Wrong password")
        }

        res.send("Login successfull")

    }catch(err){
        res.status(501).send("ERROR: " + err.message)
    }
})


adminRouter.post("/course",adminAuth, async(req,res) => {
    const admin = req.admin;
    const {
        title,
        description,
        price,
        imageUrl
    } = req.body;

    const course = new Course({
        title,
        description,
        price,
        imageUrl,
        creatorId: admin._id
    })

    await course.save();
    res.send("course saved successfully")
})

module.exports = adminRouter