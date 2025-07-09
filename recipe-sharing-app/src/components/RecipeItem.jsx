import { Link } from "react-router-dom";

export default function RecipeItem({ recipe, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition overflow-hidden">
      {/* Ảnh món ăn */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Nội dung bên dưới */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {recipe.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {recipe.description}
        </p>

        <div className="text-xs text-gray-500 mb-3">
          ⏱ {recipe.cookingTime} mins · 🍽 {recipe.servings} · 📦 {recipe.category}
        </div>

        <div className="flex gap-2 text-sm">
          <Link
            to={`/recipe/${recipe.id}`}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            View
          </Link>

          <button
            onClick={() => onEdit(recipe)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(recipe.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
