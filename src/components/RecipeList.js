import { Link } from 'react-router-dom'
import Trashcan from '../assets/trashcan.png'
import { projectFirestore } from "../firebase/config"

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }


  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
         
          <img 
            className="delete"
            onClick={() => handleClick(recipe.id)}
            src={Trashcan} alt="delete icon" 
          />
          <div className="twoButtons">
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <Link to={`/edit/${recipe.id}`}>Edit</Link>
          </div>
          
        </div>
      ))}
    </div>
  )
}