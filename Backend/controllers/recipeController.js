const Recipe = require('../models/recipe')
const mongoose = require('mongoose')

//get all
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 })
    res.status(200).json(recipes)
}

//get single
const getSingleRecipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({ error: 'Invalid id' })
    const recipe = await Recipe.findById(id)
    res.status(200).json(recipe)
    if (!recipe) return res.status(400).json({ error: "No recipe found" })
}

//post
const createRecipe = async (req, res) => {
    const { title, ingredients, time } = req.body

    try {
        const recipe = await Recipe.create({ title, ingredients, time })
        res.status(200).json(recipe)
    } catch (err) {
        res.status(400).json({ error: 'Please fill all of the fields!!!' })
    }
}

//delete 
const deleteSingleRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({ error: 'Invalid id' })

    const recipe = await Recipe.findByIdAndDelete(id)
    res.status(200).json(recipe)
    if (!recipe) return res.status(400).json({ error: "No recipe found" })
}

//update 
const updateRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({ error: 'Invalid id' })

    const recipe = await Recipe.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    res.status(200).json(recipe)
    if (!recipe) return res.status(400).json({ error: "No recipe" })
}

module.exports = {
    getRecipes,
    getSingleRecipe,
    createRecipe,
    deleteSingleRecipe,
    updateRecipe
}