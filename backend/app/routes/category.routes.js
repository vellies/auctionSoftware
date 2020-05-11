module.exports = app => {
  const categorys = require("../controllers/category.controller.js");

  // Create a new category
  app.post("/category", categorys.create);

  // Retrieve all category
  app.get("/category", categorys.findAll);

};