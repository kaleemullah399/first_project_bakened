import express from "express";
import {
  getCart,
  addToCart,
  updateQty,
  removeItem,
  updateCartItem,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateQty);
router.post("/remove", protect, removeItem);
router.put("/update", protect, updateCartItem);

export default router;