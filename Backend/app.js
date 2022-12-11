require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipes')
const userRoutes = require('./routes/user')

const app = express()

//middlewares
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/recipes',recipeRoutes)
app.use('/api/user',userRoutes)


//Connecting to mongo
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("listening on 4000")
    })
})
.catch((err)=>{console.log(err)})
