export default function RatingStars({
  rating = 0,
  size = "text-xl",
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${size} ${
            star <= rating
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}