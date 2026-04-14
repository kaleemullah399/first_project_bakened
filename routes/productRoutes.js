import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET
router.get("/", getProducts);

// CREATE (WITH IMAGE)
router.post("/", upload.single("image"), createProduct);

// UPDATE
router.put("/:id", upload.single("image"), updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

export default router;