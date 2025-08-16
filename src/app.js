const express = require("express")
const app = express();
require('dotenv').config()

const connectDb = require("./db")


app.post("/user/signup", async(req,res) => {
    res.send("hello")
})


app.post("/user/login", async(req,res) => {
    res.send("hello")
})


app.post("/user/purchase", (req, res) => {

})


app.get("/courses", async(req,res) => {
    res.send("hello")
})


app.get("/courses/purchases", async(req,res) => {
    res.send("hello")
})






connectDb().then(() => {
    console.log("Successfully connected to DB");
    app.listen(4000, () => {
    console.log("Succcessfully listening to port 4000")
    })
}).catch(() => {
    console.log("failed to connect to DB")
})

