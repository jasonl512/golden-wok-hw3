import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
}

router.get("/:sessionId", async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      cart = await Cart.create({ sessionId: req.params.sessionId, items: [], total: 0 });
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.put("/:sessionId", async (req, res, next) => {
  try {
    const items = req.body.items || [];
    const total = calculateTotal(items);
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items, total },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.delete("/:sessionId", async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: [], total: 0 },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

export default router;
