import { useEffect } from "react";
import { useRecipesContext } from "../hooks/useRecipesContext";
import RecipeDetails from '../components/recipeDetails'
import RecipeForm from "../components/RecipeForm";
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {

    const {recipes,dispatch} = useRecipesContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchRecipes = async () => {
            const response = await fetch('api/recipes',{
                headers: {'Authorization': `Bearer ${user.token}`},                
            })
            const json = await response.json()
            if(response.ok){
                dispatch({type:'SET_RECIPE', payload: json})
            }
        }
        if (user) {
            fetchRecipes()
          }
    },[dispatch])

    return ( 
        <div className="home">
            <RecipeForm/>
            <div className="recipes">
                
            {recipes && recipes.map((recipe)=>(
                <RecipeDetails key={recipe._id} recipe={recipe}/>
            ))}
            </div>
        </div>
     );
}
 
export default Home;