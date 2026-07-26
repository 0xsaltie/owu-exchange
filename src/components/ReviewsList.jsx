import ReviewCard from "./ReviewCard";

export default function ReviewsList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <div className="text-5xl mb-4">⭐</div>

        <h3 className="text-2xl font-bold">
          No Reviews Yet
        </h3>

        <p className="text-gray-500 mt-2">
          This weaver hasn't received any reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
}