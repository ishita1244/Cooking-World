import { useRef, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Recipe from '../recipe/Recipe'
import { projectFirestore } from '../../firebase/config'
import './Edit.css'

export default function Edit() {

     const { id } = useParams()
     console.log(id)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [recipe, setRecipe] = useState('')
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)
    useEffect(() => {
        setIsPending(true)
        projectFirestore.collection('recipes').doc(id).onSnapshot(doc => {
          if (doc.exists) {
            setIsPending(false)
            setRecipe(doc.data())
            setTitle(doc.data().title)
            setMethod(doc.data().method)
            setCookingTime(doc.data().cookingTime)
            setIngredients(doc.data().ingredients)
            //projectFirestore.collection('recipes').doc(id).delete()
          } else {
            setIsPending(false)
            setError(`Could not find that recipe`)
          }
        })
    
      }, [id])

    
      const history = useHistory()
  
      const handleSubmit = async (e) => {
        e.preventDefault()
        const doc = { title, ingredients, method, cookingTime: cookingTime }
    
        try {
          await projectFirestore.collection('recipes').add(doc)
          projectFirestore.collection('recipes').doc(id).delete()
          history.push('/')
        } catch (err) {
          console.log(err)
        }
      }
      const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()
    
        if (ing && !ingredients.includes(ing)) {
          setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
      }
    return (

        <div className="create">
            <h2 className="page-title">Edit Recipe</h2>
            <form onSubmit={handleSubmit}>
            <label>
            <span>Recipe Title:</span>
            <input 
            name="title"
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value.toUpperCase())}
            //   defaultValue={recipe.title} 
              required
            />
          </label>

          <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input 
              type="text" 
              
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>
        <p>Current ingredients: {ingredients.map(i => <em >{i}, </em>)}</p>

          <label>
          <span>Recipe Method:</span>
          <textarea 
           
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input 
           
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required 
          />
        </label>
               
                <button className="btn">Submit</button>
            </form>
        </div>


    )
}