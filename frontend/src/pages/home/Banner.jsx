import { Link } from "react-router-dom";
import bannerImg from "../../assets/header.png"
const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 40% Discount on</h4>
        <h1>New Items</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam labore
          magni accusantium voluptatum dolore suscipit eaque quaerat officiis
          minus consectetur!
        </p>
        <button className="btn"><Link to="/shop">Explore Now</Link></button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner" className="header__img" />
      </div>
    </div>
  );
};

export default Banner;
