import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  amazonId: {
    type: String,
    required: 'You must specify an Amazon ID for new product'
  },
  category: {
    type: String,
    required: 'You must specify a category for new product'
  },
  name: {
    type: String,
    required: 'You must specify a name for new product'
  },
  brand: {
    type: String,
    required: 'You must specify a brand for new product'
  },
  // TODO think about price
  images: {
    type: Array
  },
  description: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;