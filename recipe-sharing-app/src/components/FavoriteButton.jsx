export default function FavoriteButton({ isFav, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`text-2xl transition duration-200 ${
        isFav ? 'text-red-500 hover:scale-110' : 'text-gray-400 hover:text-red-400'
      }`}
      title={isFav ? 'Unfavorite' : 'Add to favorites'}
    >
      {isFav ? '❤️' : '🤍'}
    </button>
  );
}
