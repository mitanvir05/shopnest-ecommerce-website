import { useState, useEffect, useMemo } from "react";
import dealsImg from "../../assets/deals.png";

const DealsSection = () => {
  const targetDate = useMemo(() => new Date("2026-02-29T23:59:59"), []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="Deals" />
      </div>
      <div className="deals__content">
        <h5 className="uppercase">Get up to 20% discount</h5>
        <h4>Deals of this Month</h4>
        <p>
          Enjoy exclusive savings with up to 20% off on this month’s top deals!
          Don't miss out on amazing discounts across our fashion, accessories,
          and beauty collections.
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>{timeLeft.days}</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{timeLeft.hours}</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{timeLeft.minutes}</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{timeLeft.seconds}</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
