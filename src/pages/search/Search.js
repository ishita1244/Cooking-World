import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import RecipeList from '../../components/RecipeList'

// styles
import './Search.css'

export default function Recipe() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q').toUpperCase();
  useEffect(() => {
    const fetchData = async () => {
      await projectFirestore.collection('recipes').
      where('title','>=',query).
      where('title','<=',query+ '\uf8ff')
      .onSnapshot((querySnapshot)=>{
        const items=[];
        querySnapshot.forEach((doc)=>{
          items.push(doc.data())
        });
          setRecipe(items)
          setIsPending(false)
      })
    }

    fetchData();
  }, [])



  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {/* {error && <p className="error">{error}</p>*/}
      {isPending && <p className="loading">Loading...</p>} 
      {recipe && <RecipeList recipes={recipe} />}
    </div>
  )
}