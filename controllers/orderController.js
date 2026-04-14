import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) return res.status(400).json({ msg: "Cart empty" });

    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      totalAmount: cart.total,
    });

    await order.save();

    // clear cart after order
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET USER ORDERS
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADMIN: GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE STATUS (ADMIN)
export const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const order = await Order.findById(id);
    order.status = status;

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};