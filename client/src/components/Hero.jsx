import React from "react";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container-xl">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-text">
            <p className="eyebrow">Authentic Sichuan Cuisine</p>
            <h1>Fresh, Spicy, and Full of Flavor</h1>
            <p className="hero-description">
              Enjoy bold Sichuan classics, handmade favorites, and comforting noodle dishes
              prepared with fresh ingredients and rich house-made sauces.
            </p>
            <div className="hero-actions">
              <a href="#menu" className="btn primary-btn">Order Now</a>
              <a href="#contact" className="btn secondary-btn">Book Table</a>
            </div>
            <div className="hero-stats">
              <div><strong>4.8★</strong><span>Customer Rating</span></div>
              <div><strong>25+</strong><span>Signature Dishes</span></div>
              <div><strong>Fresh</strong><span>Daily Kitchen</span></div>
            </div>
          </div>

          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="hero-image-card">
              <img src="/images/beef-noodle-soup.png" alt="Beef Noodle Soup" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
