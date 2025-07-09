export default function RatingStars({ value = 0, onRate }) {
  return (
    <div className="flex space-x-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          title={`Rate ${star} star${star > 1 ? 's' : ''}`}
          className={`cursor-pointer text-2xl transition-transform ${
            star <= value ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
          }`}
          onClick={() => onRate(star)}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-500">{value}/5</span>
    </div>
  );
}
