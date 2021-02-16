const mongoose = require("mongoose");
const GradeSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    student: {
        ref: 'User'
    },
    attendence: {
        type: Number,
        min: 0,
        max: 100
    },
    quiz: {
        type: Number,
        min: 0,
        max: 100
    },
    project: {
        type: Number,
        min: 0,
        max: 100
    },
    midterm: {
        type: Number,
        min: 0,
        max: 100
    },
    final: {
        type: Number,
        min: 0,
        max: 100
    }
})


module.exports = mongoose.model("Grade", GradeSchema)