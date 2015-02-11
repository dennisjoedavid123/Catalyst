'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    fs      = require('fs'),
    _ = require('lodash');

/**
 * Create Product
 */
exports.create = function(req, res, next) {
    var product = new Product(req.body);
    product.provider = 'local';

    console.log(product);

    // because we set our product.provider to local our models/product.js validation will always be true
    //req.assert('email', 'You must enter a valid email address').isEmail();
    //req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
    req.assert('sku', 'SKU cannot be empty').notEmpty();
//    req.assert('Description', 'Description  cannot be more than 200 chars').len(1, 2000);
    
    var errors = req.validationErrors();

    console.log(errors);

    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    //user.roles = ['authenticated'];
    //product.roles = req.body.roles;
    product.save(function(err) {
        console.log(err);
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('Username already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }
        res.jsonp(product);
    });
};

/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
    console.log("Inside Find Product by ID");
    Product
        .findOne({
            _id: id
        })
        .exec(function(err, product) {
            console.log(err);
            if (err) return next(err);
            if (!product) return next(new Error('Failed to load Product ' + id));
            req.profile = product;
            next();
        });
};
/**
 * Update a user
 */
exports.update = function(req, res) {
    var product = req.profile;
    //var product = new Product(req.body);
    product = _.extend(product, req.body);

    product.save(function(err) {
        res.jsonp(product);
    });
};

/**
 * Delete an Product
 */
exports.destroy = function(req, res) {
    
    //var productId = req.url.substring(req.url.indexOf("products")+9,req.url.length);
    
     //product(req,res,next,productId) ;
     var product = req.profile;

     //var product =  Product
     //   .findOne({
     //       _id: productId
     //   })
     //   .exec(function(err, product) {
     //       console.log(err);
     //       if (err) console.log("err");
     //       if (!product) console.log('Failed to load Product ' + id);
     //       //req.profile = product;
     //       //next();
     //   });
    console.log("the product is "+product);
    product.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * List of Products
 */
exports.all = function(req, res) {
    Product.find().sort('-created').populate('product', 'sku description').exec(function(err, products) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(products);
        }
    });
};
