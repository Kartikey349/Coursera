const express = require("express");
const userRouter = express.Router()

userRouter.post("/signup", async(req,res) => {
    const {
        firstName,
        emailId,
        password
    } = req.body
})


userRouter.get("/login", async(req,res) => {
    res.send("hello")
})


userRouter.post("/purchase", (req, res) => {

})

module.exports = userRouter;