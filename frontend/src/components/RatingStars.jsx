import React from 'react'
import { IoMdStarOutline } from "react-icons/io";

const RatingStars = ({rating}) => {
    const stars=[];
    for(let i = 1;i<=5;i++){
       stars.push (
         <IoMdStarOutline color={i<=rating? '#FFC107':'#E0E0E0'} size={18} />
       )
    }
  return (
    <div className=' product__rating'>
      {stars}
    </div>
  )
}

export default RatingStars
