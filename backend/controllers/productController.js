import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.json(topProducts);
});

//ADMIN CONTROLLERS

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const addProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    name: "Enter Product Name",
    price: 0,
    user: req.user._id,
    image: "Copy and paste your Product Image URL",
    brand: "Enter Product Brand",
    category: "Enter Productcategory",
    countInStock: 0,
    numReviews: 0,
    description: "Enter Product description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review updated Successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getTopProducts,
  deleteProduct,
  addProduct,
  updateProduct,
  createProductReview,
};
