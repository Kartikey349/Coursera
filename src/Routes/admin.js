const express = require("express")
const adminRouter = express.Router();

adminRouter.post("/signup", async(req,res) => {
    const {
        firstName,
        emailId,
        password
    } = req.body
})


adminRouter.get("/login", async(req,res) => {
    res.send("hello")
})


adminRouter.post("/course", (req,res) => {
    
})

module.exports = adminRouter