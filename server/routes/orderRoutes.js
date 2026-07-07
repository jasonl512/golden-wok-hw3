import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { customerName = "Guest", items = [] } = req.body;
    if (!items.length) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }
    const total = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    const order = await Order.create({ customerName, items, total });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
