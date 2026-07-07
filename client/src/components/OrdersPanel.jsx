import React from "react";
export default function OrdersPanel({ orders, updateOrderStatus, deleteOrder }) {
  return (
    <section id="orders" className="section orders-section">
      <div className="container-xl">
        <p className="section-label">Orders CRUD</p>
        <h2>Order Records</h2>
        <p className="section-intro">Placed orders are saved in MongoDB. Update status or delete orders here.</p>

        <div className="orders-card">
          {orders.length === 0 ? (
            <p>No orders yet. Add food to the cart and click Place Order.</p>
          ) : (
            orders.map((order) => (
              <div className="order-row" key={order._id}>
                <div>
                  <strong>{order.customerName}</strong>
                  <p>{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
                  <p>Total: ${Number(order.total).toFixed(2)}</p>
                </div>
                <select
                  className="form-select status-select"
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="preparing">preparing</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <button className="btn danger-btn" onClick={() => deleteOrder(order._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
