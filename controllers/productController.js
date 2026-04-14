import Product from "../models/Product.js";

// AddProduct (Admin)
export const addProduct = async (req, res) => {
  try {
    const { name, price, image, category, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      category,
      stock,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, category } = req.body;

    const image = req.file ? req.file.path : "";

    const product = await Product.create({
      name,
      price,
      stock,
      category,
      image,
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

// Get All Products (User)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const updateData = {
      name,
      price,
      stock,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};