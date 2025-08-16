const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 2
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 8
    }
},
{
    timestamps: true
})



const User = mongoose.model("users", userSchema)
module.exports = User;