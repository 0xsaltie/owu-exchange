import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">
            {review.reviewerName}
          </h3>

          <p className="text-sm text-gray-500">
            {review.createdAt?.toDate?.().toLocaleDateString()}
          </p>
        </div>

        <RatingStars rating={review.rating} />
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}