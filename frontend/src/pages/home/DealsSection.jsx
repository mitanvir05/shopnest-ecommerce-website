import dealsImg from "../../assets/deals.png";
const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="" />
      </div>
      <div className="deals__content">
        <h5 className="uppercase">Get upto 20% discount</h5>
        <h4>Deals of this Month</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora iste
          unde non? Totam veniam placeat sed, inventore voluptatem beatae hic. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. consectetur adipisicing elit. Ex, deleniti!
        </p>
        <div className="deals__countdown flex-wrap">
            <div className="deals__countdown__card">
                <h4>14</h4>
                <p>Days</p>
            </div>
            <div className="deals__countdown__card">
                <h4>20</h4>
                <p>Hours</p>
            </div>
            <div className="deals__countdown__card">
                <h4>10</h4>
                <p>Mins</p>
            </div>
            <div className="deals__countdown__card">
                <h4>30</h4>
                <p>Secs</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
