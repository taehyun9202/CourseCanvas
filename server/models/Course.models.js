const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    professor: {
        type : Object,
        ref: 'User'
    },
    students: [{ 
        type : Object,
        ref: 'User'
    }],
    grade: [{
        type : Object,
        ref: 'Grade'
    }]
})


module.exports = mongoose.model("Course", CourseSchema)