const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// // open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

//Check and create Table exists or not

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createCategories = `CREATE TABLE IF NOT EXISTS categories (
    cat_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    catName varchar(255) NOT NULL,
    active BOOLEAN DEFAULT false
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

  let createProjects = `CREATE TABLE IF NOT EXISTS projects (
    project_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    projectTitle varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    cat_id varchar(255) NOT NULL,
    active BOOLEAN DEFAULT false
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

  let createUsers = `CREATE TABLE IF NOT EXISTS users (
    user_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    active BOOLEAN DEFAULT false
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

  let createProducts = `CREATE TABLE IF NOT EXISTS products (
    product_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    productName varchar(255) NOT NULL,
    price varchar(255) NOT NULL,
    active BOOLEAN DEFAULT false
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
                      
  connection.query(createCategories, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.query(createProjects, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.query(createUsers, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  connection.query(createProducts, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

});


module.exports = connection;