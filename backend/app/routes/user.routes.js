module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/users", users.create);

  // get login User
  app.post("/login", users.login);

};