import { FaTruck } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span>
          <FaTruck />
        </span>
        <h4>Free Shipping</h4>
        <p>
          Enjoy free shipping on all orders! Shop from the comfort of your home
          and have your favorite products delivered to your doorstep without
          extra charges.
        </p>
      </div>
      <div className="banner__card">
        <span>
          <FaDollarSign />
        </span>
        <h4>Money Back Guarantee</h4>
        <p>
          Shop with confidence! If you're not satisfied with your purchase, we
          offer a hassle-free money-back guarantee to ensure a risk-free
          shopping experience.
        </p>
      </div>
      <div className="banner__card">
        <span>
          <MdSupportAgent />
        </span>
        <h4>24/7 Supports</h4>
        <p>
          We're here for you anytime! Our dedicated customer support team is
          available 24/7 to assist you with any questions or concerns.
        </p>
      </div>
    </section>
  );
};

export default PromoBanner;
