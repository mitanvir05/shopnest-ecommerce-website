import { Link, useParams } from "react-router-dom";
import { MdCompareArrows } from "react-icons/md";
import RatingStars from "../../../components/RatingStars";

const SingleProduct = () => {
  const { id } = useParams();
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header ">Product Details</h2>
        <div className=" justify-center  space-x-2 flex">
          <span className=" hover:text-primary flex items-center  space-x-2">
            <Link to="/">Home</Link>
            <MdCompareArrows />
          </span>
          <span className="hover:text-primary flex items-center  space-x-2">
            <Link to="/shop">Shop</Link>
            <MdCompareArrows />
          </span>
          <span className="hover:text-primary flex">Product Name</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product img */}
          <div className="md:w-1/2  w-full">
            <img
              className="rounded-md w-full h-auto"
              src="https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">Product Name</h3>
            <p className="text-xl text-primary mb-4">
              $100 <s>$130</s>
            </p>
            <p className="text-gray-400 mb-4 ">Lorem ipsum dolor sit amet.</p>
            {/* additional product info*/}
            <div>
              <p>
                <strong>Category : </strong>accessorires
              </p>
              <p>
                <strong>Color : </strong>Red
              </p>
              <div className="flex items-center gap-1">
                <strong>Rating : </strong> <RatingStars rating={5} />
              </div>
            </div>
            {/* add to cart button */}
            <button className="mt-6 px-6 py-3 bg-primary text-white rounded-md">
              Add to cart
            </button>
          </div>
        </div>
      </section>

      {/* display reviews */}
      <section className="section__container mt-8">
        Reviews will add Here
      </section>
    </>
  );
};

export default SingleProduct;
