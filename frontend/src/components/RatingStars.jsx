import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const RatingStars = ({ rating }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        {i <= rating ? (
          <IoIosStar color="#FFC107" size={18} /> 
        ) : (
          <IoIosStarOutline color="#E0E0E0" size={18} /> 
        )}
      </span>
    );
  }

  return <div className="product__rating">{stars}</div>;
};

export default RatingStars;
