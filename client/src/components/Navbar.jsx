import React from "react";
export default function Navbar({ cartCount }) {
  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark container-xl py-3">
        <a className="navbar-brand logo" href="#home">Golden Wok</a>

        <div className="d-flex align-items-center gap-3 order-lg-2">
          <a href="#shopping-cart" className="cart-link" aria-label="View shopping cart">
            <span>🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="mainNav">
          <ul className="navbar-nav align-items-lg-center gap-lg-2">
            <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
            <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
            <li className="nav-item"><a className="nav-link" href="#admin">Admin</a></li>
            <li className="nav-item"><a className="nav-link" href="#orders">Orders</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            <li className="nav-item"><a className="btn nav-order ms-lg-2" href="#menu">Order Online</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
