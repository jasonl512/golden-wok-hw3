import React from "react";
export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container-xl">
        <div className="about-card">
          <div>
            <p className="section-label">Our Story</p>
            <h2>About Golden Wok</h2>
            <p>
              Golden Wok Sichuan started as a small family kitchen with one simple mission:
              to bring warm, bold, and memorable Sichuan flavors to the community. Every dish
              is made with fresh ingredients, house-made sauces, and a balance of spice, aroma,
              and comfort.
            </p>
          </div>
          <div className="about-highlight">
            <h3>Why Guests Love Us</h3>
            <ul>
              <li>Authentic Sichuan-style recipes</li>
              <li>Fresh ingredients cooked daily</li>
              <li>Comfort food for lunch or dinner</li>
              <li>Friendly service and cozy dining</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
