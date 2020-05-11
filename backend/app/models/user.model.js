const sql = require("./db.js");
const md5 = require('md5');

// constructor
const User = function (user) {
  this.username = user.username;
  this.password = md5(user.password);
  this.active = user.active;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { user_id: res.insertId, ...newUser });
    result(null, { user_id: res.insertId, ...newUser });
  });
};

User.login = (username, loginPassword, result) => {
  sql.query(`SELECT * FROM users Where username=?`, username, (err, res) => {
    if (err) {
      result(null, 'invalid password');
      return;
    }

    if (res.length) {
      console.log("found customer: ", res);
      for (let index = 0; index < res.length; index++) {
        const element = res[index].password;
        if (md5(loginPassword) === element) {
          result(null, res[index]);
          return;
        }
      }
      result(null, 'error');
      return ;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
