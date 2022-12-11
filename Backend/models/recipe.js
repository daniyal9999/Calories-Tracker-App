const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    ingredients: {
        type:String,
        required:true
    },
    time: {
        type:Number,
        required:true
    }
},{ timestamps:true })

module.exports = mongoose.model('Recipe', recipeSchema)