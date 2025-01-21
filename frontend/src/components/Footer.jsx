import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4 className="uppercase">Contact Info</h4>
          <p className="flex ">
            <span>
              <FaMapMarkerAlt size={18} />
            </span>
            Dhaka, Bangladesh
          </p>
          <p className="flex ">
            <span>
              <IoMdMail size={18} />
            </span>{" "}
            support@shopnest.com
          </p>
          <p className="flex ">
            <span>
              <FaPhoneAlt size={18} />
            </span>{" "}
            +880170000000
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/work">Work with us</a>
          <a href="/blog">Our Blogs</a>
        </div>
        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <a href="/">Order</a>
          <a href="#">Track Order</a>
          <a href="#">Women Cloths</a>
          <a href="#">Dress</a>
        </div>
        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="" />
            <img src={instaImg2} alt="" />
            <img src={instaImg3} alt="" />
            <img src={instaImg4} alt="" />
            <img src={instaImg5} alt="" />
            <img src={instaImg6} alt="" />
          </div>
        </div>
      </footer>
      <div className="footer__bar">
        <p>© {currentYear} ShopNest. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
