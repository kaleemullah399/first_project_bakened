import express from "express";
import {
  createOrder,
  getOrders,
  getAllOrders,
  updateStatus,
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

// admin routes
router.get("/all", protect, getAllOrders);
router.put("/status", protect, updateStatus);

export default router;