import Cart from "../models/Cart.js";

// GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    item.quantity = quantity;

    // Recalculate total
    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [],
        total: 0,
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE QUANTITY
export const updateQty = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// REMOVE ITEM
export const removeItem = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};