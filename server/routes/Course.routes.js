const Courses = require("../controllers/Course.controllers");

module.exports = app => {
    app.get("/api/Courses", Courses.getAll)
    app.post("/api/Courses", Courses.create)
    app.get("/api/Courses/:_id", Courses.getOne)
    app.delete("/api/Courses/:_id", Courses.delete)
}

