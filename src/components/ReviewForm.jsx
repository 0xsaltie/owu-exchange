import { useState } from "react";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter your review.");
      return;
    }

    onSubmit({
      rating,
      comment,
    });

    setComment("");
    setRating(5);
  };

  return (
    <form
      onSubmit={submitReview}
      className="bg-white rounded-2xl shadow-sm p-6"
    >
      <h2 className="text-2xl font-bold mb-6">
        Leave a Review
      </h2>

      <div className="mb-6">
        <label className="font-medium">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="border rounded-lg w-full mt-2 px-4 py-3"
        >
          <option value={5}>★★★★★ (5)</option>
          <option value={4}>★★★★☆ (4)</option>
          <option value={3}>★★★☆☆ (3)</option>
          <option value={2}>★★☆☆☆ (2)</option>
          <option value={1}>★☆☆☆☆ (1)</option>
        </select>
      </div>

      <textarea
        rows={5}
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Tell others about your experience..."
        className="w-full border rounded-lg p-4"
      />

      <button
        className="mt-6 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg"
      >
        Submit Review
      </button>
    </form>
  );
}