'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Product Schema
 */
var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  sku: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sku_image: {
    type: String,
    default: ['somewhere local'] 
  }
});

/**
 * Validations
 */
ProductSchema.path('sku').validate(function(sku) {
  return !!sku;
}, 'SKU cannot be blank');

ProductSchema.path('description').validate(function(content) {
  return !!content;
}, 'Description cannot be blank');

/**
 * Image
 */
// ArticleSchema.statics.load = function(id, cb) {
//   this.findOne({
//     _id: id
//   }).populate('user', 'name username').exec(cb);
// };

mongoose.model('Product', ProductSchema);
