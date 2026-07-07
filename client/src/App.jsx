import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import Gallery from "./components/Gallery.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import OrdersPanel from "./components/OrdersPanel.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { api } from "./api.js";
import { fallbackMenuItems } from "./data.js";

const SESSION_ID = "golden-wok-guest-cart";

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [apiOnline, setApiOnline] = useState(true);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  async function loadMenu() {
    try {
      const data = await api.getMenu();
      setMenuItems(data.length ? data : fallbackMenuItems);
      setApiOnline(true);
    } catch (error) {
      setMenuItems(fallbackMenuItems);
      setApiOnline(false);
      setMessage("Backend is not connected yet. Showing local fallback menu.");
    }
  }

  async function loadCart() {
    try {
      const data = await api.getCart(SESSION_ID);
      setCart(data.items || []);
    } catch (error) {
      setApiOnline(false);
    }
  }

  async function loadOrders() {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      setApiOnline(false);
    }
  }

  useEffect(() => {
    async function init() {
      setLoading(true);
      await loadMenu();
      await loadCart();
      await loadOrders();
      setLoading(false);
    }
    init();
  }, []);

  async function persistCart(nextCart) {
    setCart(nextCart);
    try {
      await api.saveCart(SESSION_ID, nextCart);
      setApiOnline(true);
    } catch (error) {
      setApiOnline(false);
      setMessage("Cart updated locally, but backend is not connected.");
    }
  }

  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.menuItemId === item._id || cartItem.name === item.name);
    let nextCart;
    if (existingItem) {
      nextCart = cart.map((cartItem) =>
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    } else {
      nextCart = [
        ...cart,
        {
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        }
      ];
    }
    persistCart(nextCart);
  }

  function increaseQuantity(name) {
    const nextCart = cart.map((item) => (item.name === name ? { ...item, quantity: item.quantity + 1 } : item));
    persistCart(nextCart);
  }

  function decreaseQuantity(name) {
    const nextCart = cart
      .map((item) => (item.name === name ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);
    persistCart(nextCart);
  }

  function removeFromCart(name) {
    persistCart(cart.filter((item) => item.name !== name));
  }

  async function clearCart() {
    setCart([]);
    try {
      await api.clearCart(SESSION_ID);
    } catch (error) {
      setApiOnline(false);
    }
  }

  async function placeOrder(customerName) {
    if (!cart.length) return;
    try {
      const order = await api.createOrder({ customerName, items: cart });
      setOrders((prev) => [order, ...prev]);
      await clearCart();
      setMessage("Order placed and saved to MongoDB.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function createMenuItem(item) {
    const created = await api.createMenuItem(item);
    setMenuItems((prev) => [...prev, created]);
    setMessage("Menu item created in MongoDB.");
  }

  async function updateMenuItem(id, item) {
    const updated = await api.updateMenuItem(id, item);
    setMenuItems((prev) => prev.map((menuItem) => (menuItem._id === id ? updated : menuItem)));
    setMessage("Menu item updated in MongoDB.");
  }

  async function deleteMenuItem(id) {
    await api.deleteMenuItem(id);
    setMenuItems((prev) => prev.filter((item) => item._id !== id));
    setMessage("Menu item deleted from MongoDB.");
  }

  async function updateOrderStatus(id, status) {
    const updated = await api.updateOrder(id, { status });
    setOrders((prev) => prev.map((order) => (order._id === id ? updated : order)));
    setMessage("Order status updated in MongoDB.");
  }

  async function deleteOrder(id) {
    await api.deleteOrder(id);
    setOrders((prev) => prev.filter((order) => order._id !== id));
    setMessage("Order deleted from MongoDB.");
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />

      <main>
        {message && <div className="container-xl mt-4 alert alert-warning">{message}</div>}
        {!apiOnline && (
          <div className="container-xl alert alert-info">
            Start the Express server and connect MongoDB to use live database features.
          </div>
        )}

        <Menu menuItems={menuItems} addToCart={addToCart} loading={loading} />
        <Cart
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          placeOrder={placeOrder}
        />
        <Gallery menuItems={menuItems.length ? menuItems : fallbackMenuItems} />
        <AdminPanel
          menuItems={menuItems}
          createMenuItem={createMenuItem}
          updateMenuItem={updateMenuItem}
          deleteMenuItem={deleteMenuItem}
        />
        <OrdersPanel orders={orders} updateOrderStatus={updateOrderStatus} deleteOrder={deleteOrder} />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
