import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeItem from './RecipeItem';
import RecipeForm from './RecipeForm';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('none');

  const fetchRecipes = () => {
    axios.get('http://localhost:3001/recipes')
      .then(res => {
        setRecipes(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error("Error fetching recipes:", err));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    let data = [...recipes];
    if (filter !== 'All') {
      data = data.filter(r => r.category === filter);
    }

    if (sort === 'time') {
      data.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (sort === 'rating') {
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'title') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFiltered(data);
  }, [filter, sort, recipes]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/recipes/${id}`);
    fetchRecipes();
  };

  const handleEdit = (recipe) => {
    setEditing(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (updated) => {
    await axios.put(`http://localhost:3001/recipes/${updated.id}`, updated);
    setEditing(null);
    fetchRecipes();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">🍽️ All Recipes</h2>

      {editing && (
        <div className="mb-6">
          <RecipeForm editing={editing} onSave={handleUpdate} />
        </div>
      )}

      {/* Filter & Sort */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <label className="mr-2 font-medium">Filter by Category:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option>All</option>
            <option>Dinner</option>
            <option>Breakfast</option>
            <option>Dessert</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="none">None</option>
            <option value="title">Title A-Z</option>
            <option value="time">Cooking Time</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">
          <img
            src="https://source.unsplash.com/300x200/?empty,food"
            alt="no recipes"
            className="mx-auto mb-4 rounded shadow"
          />
          <p>No recipes found for selected filter.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
