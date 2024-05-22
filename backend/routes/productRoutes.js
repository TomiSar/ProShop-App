import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// Fetch all products
// @route GET /api/products
router.route('/').get(getProducts);

// Fetch signgle product
// @route GET /api/products
router.route('/:id').get(getProductById);

export default router;
