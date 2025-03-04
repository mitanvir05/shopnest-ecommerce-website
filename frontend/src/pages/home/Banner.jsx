import { Link } from "react-router-dom";
import bannerImg from "../../assets/header1.png";
const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 40% Discount on</h4>
        <h1>New Items</h1>
        <p>
          Discover the latest arrivals with unbeatable discounts! Enjoy up to
          40% off on our newest collection. Elevate your style with trendy
          fashion, elegant accessories, and premium beauty products at the best
          prices.
        </p>
        <button className="btn">
          <Link to="/shop">Explore Now</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner" className="header__img" />
      </div>
    </div>
  );
};

export default Banner;
