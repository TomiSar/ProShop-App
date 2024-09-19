import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Product from '../models/productModel';
import asyncHandler from '../middleware/asyncHandler';
import { CustomRequest } from '../types';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT);
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Fetch a product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Resource not Found');
  }
});

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error('User not authenticated');
    }

    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }
);

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
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
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not Found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      if (!req.user) {
        res.status(401);
        throw new Error('User not authenticated');
      }

      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user!._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      // Create a new review document
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment: comment as string,
        user: new mongoose.Types.ObjectId(req.user._id),
      };

      product.reviews.push(review); // Directly push the new review object
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }
);

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
