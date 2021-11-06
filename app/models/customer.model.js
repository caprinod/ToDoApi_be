const sql = require("./db.js");

// constructor
const Task = function (task) {
  this.taskUserID = task.taskUserID;
  this.taskStatus = task.taskStatus;
  this.taskTitle = task.taskTitle;
  this.taskTS = task.taskTS;
};

Task.create = (newTask, result) => {
  sql.query("INSERT INTO todotasks SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};

Task.findById = (taskUserID, result) => {
  sql.query(`SELECT * FROM todotasks WHERE taskUserID = ${taskUserID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found task: ", res[0]);
      result(null, res);
      return;
    }

    // not found Task with the id
    result({ kind: "not_found" }, null);
  });
};

Task.getAll = result => {
  sql.query("SELECT * FROM todotasks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todotasks: ", res);
    result(null, res);
  });
};

Task.updateById = (taskID, task, result) => {
  sql.query(
    "UPDATE todotasks SET taskStatus = ?, taskTitle = ?, taskTS = ? WHERE taskID = ?",
    [task.taskStatus, task.taskTitle, task.taskTS, taskID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task: ", { taskID: taskID, ...task });
      result(null, { taskID: taskID, ...task });
    }
  );
};

Task.remove = (taskID, result) => {
  sql.query("DELETE FROM todotasks WHERE taskID = ?", taskID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task with id: ", taskID);
    result(null, res);
  });
};

Task.removeAll = result => {
  sql.query("DELETE FROM todotasks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} todotasks`);
    result(null, res);
  });
};

module.exports = Task;