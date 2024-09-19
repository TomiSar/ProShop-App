import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Interface for the Review schema
export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

// Interface for the Product schema
export interface IProduct extends Document {
  user: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Types.DocumentArray<IReview>;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Review schema using the interface
const reviewSchema: Schema<IReview> = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

// mongoose.Schema.
// Product schema using the interface
const productSchema: Schema<IProduct> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Product model using the schema and interface
const Product: Model<IProduct> = mongoose.model<IProduct>(
  'Product',
  productSchema
);

export default Product;
