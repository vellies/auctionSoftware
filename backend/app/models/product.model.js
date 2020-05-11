const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.productName = product.productName;
  this.price = product.price;
  this.active = product.active;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categories : ", { product_id: res.insertId, ...newProduct });
    result(null, { product_id: res.insertId, ...newProduct });
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM products p  Where p.active=1", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Product;
