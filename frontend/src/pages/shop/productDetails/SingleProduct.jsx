import { Link, useParams } from "react-router-dom";
import { MdCompareArrows } from "react-icons/md";
import RatingStars from "../../../components/RatingStars";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const disPatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddProductToCart = (product) => {
    disPatch(addToCart(product));
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error fetching product details: {error.message}</h2>;

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
          <span className="hover:text-primary flex">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product img */}
          <div className="md:w-1/2  w-full">
            <img
              className="rounded-md w-full h-auto"
              src={singleProduct?.image}
              alt=""
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct.name}
            </h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct?.price}{" "}
              {singleProduct.oldPrice && <s>${singleProduct?.oldPrice}</s>}
            </p>
            <p className="text-gray-400 mb-4 ">{singleProduct?.description}</p>
            {/* additional product info*/}
            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category : </strong>
                {singleProduct?.category}
              </p>
              <p>
                <strong>Color : </strong>
                {singleProduct?.color}
              </p>
              <div className="flex items-center gap-1">
                <strong>Rating : </strong>{" "}
                <RatingStars rating={singleProduct?.rating} />
              </div>
            </div>
            {/* add to cart button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddProductToCart(singleProduct);
              }}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-md"
            >
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
