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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
          quibusdam?
        </p>
      </div>
      <div className="banner__card">
        <span>
          <FaDollarSign />
        </span>
        <h4>Money Back Guarantee</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
          quibusdam?
        </p>
      </div>
      <div className="banner__card">
        <span>
          <MdSupportAgent />
        </span>
        <h4>24/7 Supports</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
          quibusdam?
        </p>
      </div>
    </section>
  );
};

export default PromoBanner;
