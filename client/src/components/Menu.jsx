import React from "react";
export default function Menu({ menuItems, addToCart, loading }) {
  return (
    <section id="menu" className="section menu-section">
      <div className="container-xl">
        <p className="section-label">Customer Favorites</p>
        <h2>Our Menu</h2>
        <p className="section-intro">Menu items are loaded from MongoDB through the Express API.</p>

        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {menuItems.map((item) => (
              <div className="col-12 col-md-6 col-lg-4" key={item._id}>
                <article className="menu-card h-100">
                  <img src={item.image} alt={item.name} />
                  <div className="card-body-custom">
                    <div className="d-flex justify-content-between gap-2">
                      <h3>{item.name}</h3>
                      <span className="category-badge">{item.category}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                      <span className="price">${Number(item.price).toFixed(2)}</span>
                      <button className="btn primary-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
