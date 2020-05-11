const sql = require("./db.js");

// constructor
const Project = function(project) {
  this.projectTitle = project.projectTitle;
  this.user_id = project.user_id;
  this.cat_id = project.cat_id;
  this.active = project.active;
};

Project.create = (newProject, result) => {
  sql.query("INSERT INTO projects SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { project_id: res.insertId, ...newProject });
    result(null, { project_id: res.insertId, ...newProject });
  });
};

Project.getAll = result => {
  sql.query("SELECT * FROM projects p LEFT JOIN users u ON u.user_id=p.user_id LEFT JOIN categories c ON c.cat_id=p.cat_id LEFT JOIN products pr ON pr.product_id=u.product_id Where p.active=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE projects SET projectTitle = ?, user_id = ?, cat_id=?, active = ? WHERE project_id = ?",
    [project.projectTitle, project.user_id,project.cat_id, project.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated project: ", { project_id: id, ...project });
      result(null, { project_id: id, ...project });
    }
  );
};

Project.updateByStatus = (id, project, result) => {
  sql.query(
    "UPDATE projects SET active = ? WHERE project_id = ?",
    [ '0', id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated project: ", { project_id: id, ...project });
      result(null, { project_id: id, ...project });
    }
  );
};

Project.findById = (projectId, result) => {
  sql.query(`SELECT * FROM projects WHERE project_id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Project;
