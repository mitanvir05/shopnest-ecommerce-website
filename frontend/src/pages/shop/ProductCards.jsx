/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import RatingStars from "../../components/RatingStars";

const ProductCards = ({ products }) => {
  // console.log(products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="products__card">
          <div className="relative">
            <Link to={`/shop/${product.id}`}>
              <img
                src={product.image}
                alt=""
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="hover:block absolute top-3 right-3">
              <button>
                <BsCart3 className="bg-primary p-0.5 text-white hover:bg-primary-dark" />
              </button>
            </div>
          </div>
          {/* product description */}
          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              ${product.price}{" "}
              {product.oldPrice ? <s>${product.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating}/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
