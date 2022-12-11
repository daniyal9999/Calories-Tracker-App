const express = require('express')
const router = express.Router()
const {getRecipes,
    getSingleRecipe,
    createRecipe,
    deleteSingleRecipe,
    updateRecipe} = require('../controllers/recipeController')

//GET all recipes
router.get('/', getRecipes)


//GET single recipe
router.get('/:id',getSingleRecipe)

//POST single recipe
router.post('/', createRecipe)

//DELETE single recipe
router.delete('/:id', deleteSingleRecipe)

//UPDATE single recipe
router.patch('/:id', updateRecipe)



module.exports = router