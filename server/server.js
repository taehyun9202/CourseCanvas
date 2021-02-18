const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const port = 8000;
const db_name = "courseCanvas"
const app = express()

// bodyparser middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(bodyParser.json())


require("./config/mongoose")(db_name)
require("./routes/Course.routes")(app)
require("./routes/User.routes")(app)

app.listen(port, ()=> console.log(`Listening on port ${port}`))