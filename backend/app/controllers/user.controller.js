const User = require("../models/user.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a User
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        active: req.body.active
      });
    
      // Save User in the database
      User.create(user, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else res.send(data);
      });
};

// Create and Save a new Customer
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    // Save User in the database
    User.login(req.body.userName,req.body.password, (err, data) => {
      if (err){
        res.send("error")
      }else res.send(data);
    });
};

