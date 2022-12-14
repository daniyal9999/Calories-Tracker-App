import '../index.css'
import { useRecipesContext } from "../hooks/useRecipesContext"
import formatDistanceToNow  from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const RecipeDetails = ({recipe}) => {

    const { dispatch } = useRecipesContext()
    const { user } = useAuthContext()

    const handleClick = async() => {
        
        if (!user) {
            return
        }

        const response = await fetch('/api/recipes/' + recipe._id, { 
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({ type: 'DELETE_RECIPE', payload: json})
        }
    }

    return (  
    <div className="recipeDetails">
    <h1>{recipe.title }</h1>
    <p>{recipe.ingredients}</p>
    <p>{recipe.time}</p>
    <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
    <span className="delete" onClick={handleClick}>Delete</span>

    </div>
    );
}
 
export default RecipeDetails;