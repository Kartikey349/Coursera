const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 2
    }
})



const User = mongoose.model("users", userSchema)
module.exports = User;