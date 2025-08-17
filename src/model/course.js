const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId
    },
    imageUrl: {
        type: string
    }
},{
    timestamps: true
})



const Course = mongoose.model("courses", courseSchema)
module.exports = Course;