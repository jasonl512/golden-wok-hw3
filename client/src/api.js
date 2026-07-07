const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

export const api = {
  getMenu: () => request("/api/menu"),
  createMenuItem: (item) => request("/api/menu", { method: "POST", body: JSON.stringify(item) }),
  updateMenuItem: (id, item) => request(`/api/menu/${id}`, { method: "PUT", body: JSON.stringify(item) }),
  deleteMenuItem: (id) => request(`/api/menu/${id}`, { method: "DELETE" }),

  getCart: (sessionId) => request(`/api/cart/${sessionId}`),
  saveCart: (sessionId, items) => request(`/api/cart/${sessionId}`, { method: "PUT", body: JSON.stringify({ items }) }),
  clearCart: (sessionId) => request(`/api/cart/${sessionId}`, { method: "DELETE" }),

  createOrder: (order) => request("/api/orders", { method: "POST", body: JSON.stringify(order) }),
  getOrders: () => request("/api/orders"),
  updateOrder: (id, order) => request(`/api/orders/${id}`, { method: "PUT", body: JSON.stringify(order) }),
  deleteOrder: (id) => request(`/api/orders/${id}`, { method: "DELETE" })
};
