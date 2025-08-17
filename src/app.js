const express = require("express")
const app = express();
require('dotenv').config()
const connectDb = require("./db")
const cookieparser = require("cookie-parser")

app.use(express.json())
app.use(cookieparser())

const userRouter =  require("./Routes/user")
const courseRouter = require("./Routes/course")
const adminRouter = require("./Routes/admin")


app.use("/user", userRouter)
app.use("/courses", courseRouter)
app.use("/admin", adminRouter)


connectDb().then(() => {
    console.log("Successfully connected to DB");
    app.listen(4000, () => {
    console.log("Succcessfully listening to port 4000")
    })
}).catch(() => {
    console.log("failed to connect to DB")
})

