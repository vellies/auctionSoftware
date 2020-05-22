module.exports = app => {
  const projects = require("../controllers/project.controller.js");
  const token =  require('../config/verifyToken');

  // Create a new rojects
  app.post("/project", token.verifyToken,projects.create);

  // Retrieve all User
  app.get("/project", token.verifyToken,projects.findAll);

  // Update a Project with projectId
  app.put("/project/:projectId", projects.update);

  // Retrieve a single Project with projectId
  app.get("/project/:projectId", projects.findOne);

  // Update a Project with projectId
  app.put("/projectStatus/:projectId", projects.updateStatus);

};