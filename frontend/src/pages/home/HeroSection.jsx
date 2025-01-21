import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";
const HeroSection = () => {
  const cards = [
    {
      id: 1,
      image: card1,
      title: "Casual Shirt",
      trend: "Summer 2025",
    },
    {
      id: 2,
      image: card2,
      title: "Formal Shirt",
      trend: "Office Wear",
    },
    {
      id: 3,
      image: card3,
      title: "Designer Shirt",
      trend: "Luxury Collection",
    },
  ];
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div className="hero__card" key={card.id}>
          <img src={card.image} alt="" />
          <div className="hero__content">
            <p>{card.trend}</p>
            <h4>{card.title}</h4>
            <a href="#">Discover More</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
