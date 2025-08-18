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
        type: String
    }
},{
    timestamps: true
})



const Course = mongoose.model("Course", courseSchema)
module.exports = Course;