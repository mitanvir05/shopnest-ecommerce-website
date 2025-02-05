import { useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import Swal from "sweetalert2";  

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (rating) => {
    setRating(rating); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
     
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields before submitting!',
      });
      return; 
    }

    const newComment = {
      comment,
      rating,
      userId: user?._id,
      productId: id,
    };
    try {
      await postReview(newComment).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Review posted!',
        text: 'Your review has been successfully posted.',
      });
      setComment("");
      setRating(0); 
      refetch(); 
    } catch (error) {
      console.error("Error posting review:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error posting your review. Please try again later.',
      });
    }
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center z-40 
        px-2 ${isModalOpen ? "block" : "hidden"}`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50 mx-auto">
        <h2 className="text-lg font-medium mb-4">Post a review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer text-yellow-500 text-lg"
              onClick={() => handleRating(star)}
            >
              {rating >= star ? <IoIosStar /> : <IoIosStarOutline />}
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full border border-gray-500 rounded-md mb-4 p-2"
          placeholder="Write your review here..."
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-400 hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
