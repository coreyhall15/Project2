/////////////////////////////////////////
///////IMPORT DEPENDENCIES
////////////////////////////////////////
require("dotenv").config()//Load ENV Variables
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const express = require('express');
const PORT = process.env.PORT



/////////////////////////////////////////
///////ESTABLISH DATABASE CONNECTION
////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}




//Establish connection
mongoose.connect(DATABASE_URL, CONFIG)


//Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", ()=> console.log("connected to Mongoose"))
.on("close", ()=> console.log("disconnected to Mongoose"))
.on("error", (error)=> console.log("error"))



/////////////////////////////////////////
///////OUR MODEL
////////////////////////////////////////





/////////////////////////////////////////
///////CREATE APP OBJECT
////////////////////////////////////////
const app = express();
const Car = require('./models/cars.js');


//Public Folder
app.use(express.static('public'))

/////////////////////////////////////////
///////MIDDLEWARE
////////////////////////////////////////
app.use(express.urlencoded( {extended: true} ))
app.use(methodOverride("_method"))

// INDEX
app.get('/car', (req, res) => {
    res.render('index.ejs', { data: Car});
    });
    
    // NEW
    app.get("/car/new", (req, res) => {
        res.render("new.ejs")
      })
      
      // DELETE
    
      app.delete("/car/:id", (req, res) => {
        console.log("delete route")
        console.log(req.params.id)
        Car.splice(req.params.id,1);
            res.redirect("/car")
      })
    
      // UPDATE
    app.put("/car/:id", (req, res) => {
      console.log(req.body)
      console.log(req.body.stats[0])
      
    
      Car[req.params.id] =   {
        name:req.body.name,
        img:req.body.img,
        type:req.body.type,
        stats:{
          price:req.body.hp,
          
      }
    }
    
      console.log(req.body)
      //Pokemon[req.params.id] =req.body.pk
      res.redirect(`/car/${req.params.id}`);
    })


    // CREATE
app.post("/car", (req, res) => {
    console.log(req.body)
    let newCar = {
      name: req.body.name,
      img:req.body.img,
      type:req.body.type,
      stats:{
        price:req.body.hp,
        
    }
  }
    Car.push(newCar)
    res.redirect("/car")
    })
  
  
  // EDIT
  app.get("/car/:id/edit", (req, res) => {
      res.render("edit.ejs", { data: Car[req.params.id],
      index:req.params.id })
  
   
  })
  
  
  
  // SHOW
  app.get('/car/:id', (req, res) => {
  res.render('show.ejs', { data: Car[req.params.id],
                          index: req.params.id });
  });
  
app.listen(PORT, () => console.log('Bands will make her dance on port: ${PORT}'))