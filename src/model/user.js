const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
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



const adminSchema = new mongoose.Schema({
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
})



const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
},{
    timestamps: true
})



const User = mongoose.model("users", userSchema)
const Admin = mongoose.model("admins", adminSchema)
const Purchased = mongoose.model("purchased", purchaseSchema)


module.exports = {
    User,
    Admin,
    Purchased
}