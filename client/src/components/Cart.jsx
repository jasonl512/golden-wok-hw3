import React from "react";
import { useMemo, useState } from "react";

export default function Cart({ cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, placeOrder }) {
  const [customerName, setCustomerName] = useState("Guest");
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <section id="shopping-cart" className="section pt-0">
      <div className="container-xl">
        <div className="cart-box">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <span className="cart-pill">Database Cart</span>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-row" key={item.name}>
                  <span className="cart-name">{item.name}</span>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.name)} aria-label={`Decrease ${item.name}`}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.name)} aria-label={`Increase ${item.name}`}>+</button>
                  </div>
                  <span>${Number(item.price).toFixed(2)} each</span>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button className="remove-btn" onClick={() => removeFromCart(item.name)}>Remove</button>
                </div>
              ))}
            </div>
          )}

          <div className="cart-summary">
            <div>
              <label className="form-label text-white-50">Customer name</label>
              <input
                className="form-control customer-input"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn secondary-btn" disabled={!cart.length} onClick={clearCart}>Clear Cart</button>
              <button className="btn primary-btn" disabled={!cart.length} onClick={() => placeOrder(customerName)}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
