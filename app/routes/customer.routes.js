module.exports = app => {
  const tasks = require("../controllers/customer.controller.js");

  // Create a new task
  app.post("/tasks", tasks.create);

  // Retrieve all Tasks
  app.get("/tasks", tasks.findAll);

  // Retrieve a single Task with taskID
  app.get("/tasks/:taskUserID", tasks.findOne);

  // Update a Task with TaskID
  app.put("/tasks/:taskID", tasks.update);

  // Delete a Task with TaskID
  app.delete("/tasks/:taskID", tasks.delete);

  // Delete All Tasks
  app.delete("/tasks", tasks.deleteAll);
};