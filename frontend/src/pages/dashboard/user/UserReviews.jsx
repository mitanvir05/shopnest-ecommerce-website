import React from "react";
import { useSelector } from "react-redux";
import { useGetReviewsByUserIdQuery } from "../../../redux/features/reviews/reviewsApi";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa"; 

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: reviewsData, error, isLoading } = useGetReviewsByUserIdQuery(user?._id);
  const navigate = useNavigate();
  const reviews = reviewsData?.reviews || [];

  // Handle loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  // Handle errors
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-5">
        ⚠ You have no reviews. {error.message}
      </div>
    );

  // Function to format the review date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div className="flex text-yellow-500">
        {[...Array(totalStars)].map((_, index) =>
          index < rating ? (
            <FaStar key={index} className="mr-1" /> 
          ) : (
            <FaRegStar key={index} className="mr-1" /> 
          )
        )}
      </div>
    );
  };

  // Handle "Add Review" Card Click
  const handleCardClick = () => {
    navigate("/shop");
  };

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Given Reviews</h2>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 cursor-pointer 
                  hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                <p className="text-lg font-semibold mb-2 flex items-center">
                  <span className="text-gray-700 mr-2">Rating:</span>
                  {renderStars(review?.rating)}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Comment:</strong> {review?.comment || "No comment provided"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Product ID:</strong> {review?.productId || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong> {formatDate(review?.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 font-semibold col-span-3">
              No reviews found.
            </div>
          )}

          {/* Add New Review Card */}
          <div
            onClick={handleCardClick}
            className="bg-gray-100 text-black flex flex-col items-center justify-center p-6 border cursor-pointer 
            transition-all duration-200 hover:bg-indigo-600 hover:text-white rounded-lg shadow-md"
          >
            <span className="text-3xl font-bold">+</span>
            <p className="mt-2 text-lg font-semibold">Add New Review</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReviews;
