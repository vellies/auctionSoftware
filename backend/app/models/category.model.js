const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.catName = category.catName;
  this.active = category.active;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categories : ", { cat_id: res.insertId, ...newCategory });
    result(null, { cat_id: res.insertId, ...newCategory });
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM categories c  Where c.active=1", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Category;
