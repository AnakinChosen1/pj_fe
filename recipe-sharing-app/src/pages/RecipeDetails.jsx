import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "../components/CommentForm";
import RatingStars from "../components/RatingStars";
import FavoriteButton from "../components/FavoriteButton";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error("Error loading recipe:", err));
  }, [id]);

  const handleAddComment = async (text) => {
    const newComment = {
      username: "demo", // giả lập người dùng
      text,
      timestamp: new Date().toISOString()
    };
    const updated = {
      ...recipe,
      comments: [...(recipe.comments || []), newComment]
    };
    await axios.put(`http://localhost:3001/recipes/${id}`, updated);
    setRecipe(updated);
  };

  const handleRate = async (newRating) => {
    const updated = { ...recipe, rating: newRating };
    await axios.put(`http://localhost:3001/recipes/${id}`, updated);
    setRecipe(updated);
  };

  const handleToggleFavorite = async () => {
    const currentUserId = 1;
    const favs = new Set(recipe.favorites || []);
    favs.has(currentUserId) ? favs.delete(currentUserId) : favs.add(currentUserId);
    const updated = { ...recipe, favorites: [...favs] };
    await axios.put(`http://localhost:3001/recipes/${id}`, updated);
    setRecipe(updated);
  };

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
      <p className="mb-2 text-gray-600">{recipe.description}</p>

      <div className="flex items-center gap-4 mb-4">
        <RatingStars value={recipe.rating || 0} onRate={handleRate} />
        <FavoriteButton isFav={recipe.favorites?.includes(1)} onToggle={handleToggleFavorite} />
      </div>

      <h4 className="font-bold mt-4">Ingredients:</h4>
      <ul className="list-disc ml-6 mb-4">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <p className="mt-4"><strong>Instructions:</strong> {recipe.instructions}</p>

      <h4 className="mt-6 font-bold">Comments:</h4>
      <ul className="list-disc ml-6 mb-4">
        {recipe.comments?.map((c, i) => (
          <li key={i}><strong>{c.username}:</strong> {c.text}</li>
        ))}
      </ul>

      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}
