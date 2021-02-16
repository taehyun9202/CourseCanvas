const Users = require("../controllers/User.controllers");
const { authenticate } = require("../config/jwt");

module.exports = app => {
    app.post("/api/signUp", Users.register)
    app.post("/api/signIn",  Users.login)
    app.get("/api/users/", Users.getAll)
    app.get("/api/students/", Users.getStudents)
    app.get("/api/users/:_id", Users.getOne)
    app.delete("/api/users/:_id", Users.delete)
    app.put("/api/users/:_id", Users.update)
}