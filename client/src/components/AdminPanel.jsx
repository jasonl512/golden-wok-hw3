import React from "react";
import { useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "/images/mapo-tofu-new.png",
  category: "Main"
};

export default function AdminPanel({ menuItems, createMenuItem, updateMenuItem, deleteMenuItem }) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const item = { ...form, price: Number(form.price) };

    if (editingId) {
      await updateMenuItem(editingId, item);
    } else {
      await createMenuItem(item);
    }

    setForm(emptyForm);
    setEditingId("");
  }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category || "Main"
    });
  }

  return (
    <section id="admin" className="section admin-section">
      <div className="container-xl">
        <p className="section-label">Admin CRUD</p>
        <h2>Menu Management</h2>
        <p className="section-intro">Create, update, and delete menu items. These changes are saved in MongoDB.</p>

        <div className="row g-4">
          <div className="col-lg-5">
            <form className="admin-card" onSubmit={handleSubmit}>
              <h3>{editingId ? "Edit Menu Item" : "Add Menu Item"}</h3>
              <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              <textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
              <input className="form-control" name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
              <input className="form-control" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
              <select className="form-select" name="image" value={form.image} onChange={handleChange}>
                <option value="/images/mapo-tofu-new.png">Mapo Tofu Image</option>
                <option value="/images/kung-pao-chicken.png">Kung Pao Chicken Image</option>
                <option value="/images/beef-noodle-soup.png">Beef Noodle Image</option>
                <option value="/images/dumplings.png">Dumplings Image</option>
                <option value="/images/spicy-fish.png">Spicy Fish Image</option>
                <option value="/images/fried-rice.png">Fried Rice Image</option>
              </select>
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn primary-btn" type="submit">{editingId ? "Update Item" : "Create Item"}</button>
                {editingId && (
                  <button className="btn secondary-light-btn" type="button" onClick={() => { setEditingId(""); setForm(emptyForm); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="col-lg-7">
            <div className="admin-card">
              <h3>Current MongoDB Menu</h3>
              <div className="admin-list">
                {menuItems.map((item) => (
                  <div className="admin-row" key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <p>${Number(item.price).toFixed(2)} · {item.category}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn small-btn" onClick={() => startEdit(item)}>Edit</button>
                      <button className="btn danger-btn" onClick={() => deleteMenuItem(item._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
