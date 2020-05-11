const Category = require("../models/category.model.js");

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Category
      const category = new Category({
        catName: req.body.catName,
        active: req.body.active
      });
    
      // Save Category in the database
      Category.create(category, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Category."
          });
        else res.send(data);
      });
};

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving category."
        });
      else res.send(data);
    });
};
