const express =  require("express")
const courseRouter = express.Router()


courseRouter.get("/preview", async(req,res) => {
    res.send("hello")
})


courseRouter.get("/purchased", async(req,res) => {
    res.send("hello")
})



module.exports = courseRouter