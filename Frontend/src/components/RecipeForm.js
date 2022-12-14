import { useState } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import '../index.css'
import { useAuthContext } from "../hooks/useAuthContext";

const RecipeForm = () => {
    const {dispatch} = useRecipesContext()
    const {user} = useAuthContext()

    const [title,setTitle] = useState('');
    const [ingredients,setIngredients] = useState('');
    const [time,setTime] = useState('');
    const [error, setError] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
          setError('You must be logged in')
          return
        }

        const recipe = {title, ingredients, time}
    
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setError(null)
        setTitle('')
        setIngredients('')
        setTime('')
        console.log('new recipe added:', json)
        dispatch({type:'CREATE_RECIPE' , payload: json})
      }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Recipe</h3>
            <label >Title</label>
            <input 
                type="text"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
             />

            <label >Ingredients</label>
            <input 
                type="text"
                onChange={(e)=>setIngredients(e.target.value)}
                value={ingredients}
             />

            <label >Time</label>
            <input 
                type="number"
                onChange={(e)=>setTime(e.target.value)}
                value={time}
             />
             <button>Add Recipe</button>
             { error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default RecipeForm;
