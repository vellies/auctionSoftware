module.exports = app => {
  const products = require("../controllers/product.controller.js");

  // Create a new category
  app.post("/product", products.create);

  // Retrieve all category
  app.get("/product", products.findAll);

};