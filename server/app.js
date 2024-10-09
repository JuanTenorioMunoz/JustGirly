// este archivo es para definir endpoints

const express = require("express")
const cors = require("cors")

const app = express() // Creates HTTP server
app.use(express.json()) // utility to process JSON in requests
app.use(cors()) // utility to allow clients to make requests from other hosts or ips

const usersRouter = require("./routes/users")

app.use("/", usersRouter)
//son endpoints, se controlan con los controladores en lugar de los handlers
//son requests
module.exports = app
