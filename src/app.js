const express = require("express")
const app = express();
require('dotenv').config()
const connectDb = require("./db")


app.use(express.json())

const userRouter =  require("./Routes/user")
const courseRouter = require("./Routes/course")


app.use("/user", userRouter)
app.use("/courses", courseRouter)







connectDb().then(() => {
    console.log("Successfully connected to DB");
    app.listen(4000, () => {
    console.log("Succcessfully listening to port 4000")
    })
}).catch(() => {
    console.log("failed to connect to DB")
})

