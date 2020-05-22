const Project = require("../models/project.model.js");
const config = require('../config/jwt.json');
const token = require('../config/verifyToken');
const jwt = require('jsonwebtoken');;

// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Project
  const project = new Project({
    projectTitle: req.body.projectTitle,
    user_id: req.body.userId,
    cat_id: req.body.catId,
    active: req.body.active
  });


  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.status(403).send({
        message:
          err.message || "Some error occurred while creating the data."
      });
    } else {
      // Save Project in the database
      Project.create(project, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the data."
          });
        else res.send(data);
      });
    }
  });



};

// Retrieve all Project from the database.
exports.findAll = (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Project.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Project."
          });
        else res.send(data.reverse());
      });
    }
  });
};

// Update a Project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Project.updateById(
    req.params.projectId,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Project with id ${req.params.projectId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Project with id " + req.params.projectId
          });
        }
      } else res.send(data);
    }
  );
};

// UpdateStatus a Project identified by the projectId in the request
exports.updateStatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Project.updateByStatus(
    req.params.projectId,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Project with id ${req.params.projectId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Project with id " + req.params.projectId
          });
        }
      } else res.send(data);
    }
  );
};

// Find a single Project with a projectId
exports.findOne = (req, res) => {
  Project.findById(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Project with id ${req.params.projectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Project with id " + req.params.projectId
        });
      }
    } else res.send(data);
  });
};
