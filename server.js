//Import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")


//create express app
const app = express()
const Cars = require('./models/cars.js');
//establise mongoose connection
mongoose.connect(process.env.DATABASE_URL)

//mongoose connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected to Mongo"))
.on("error", (error) => console.log(error))

//register middleware
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride("_method"))
app.use('/cars', CarRouter)
app.use('/user', UserRouter)
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
  }))

//routes and routers
app.get("/" , (req, res) => {
    res.send("<h1>Server is Working<h1>")
})






//Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening on PORT`))
  