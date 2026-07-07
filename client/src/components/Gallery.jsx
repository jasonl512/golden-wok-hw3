import React from "react";
import { useState } from "react";

export default function Gallery({ menuItems }) {
  const [index, setIndex] = useState(0);
  const images = menuItems.map((item) => item.image);

  function nextSlide() {
    setIndex((prev) => (prev + 1) % images.length);
  }

  function prevSlide() {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  if (!images.length) return null;

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container-xl text-center">
        <p className="section-label">Gallery</p>
        <h2>Food & Dining Moments</h2>
        <p className="section-intro">Use the arrows to view photos from our menu.</p>
        <div className="slider">
          <button className="slide-btn" onClick={prevSlide} aria-label="Previous image">❮</button>
          <img src={images[index]} alt="Restaurant gallery" />
          <button className="slide-btn" onClick={nextSlide} aria-label="Next image">❯</button>
        </div>
        <p className="slide-count">{index + 1} / {images.length}</p>
      </div>
    </section>
  );
}
