const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Product
      const product = new Product({
        productName: req.body.productName,
        price:req.body.price,
        active: req.body.active
      });
    
      // Save Product in the database
      Product.create(product, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Product."
          });
        else res.send(data);
      });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Product."
        });
      else res.send(data);
    });
};
