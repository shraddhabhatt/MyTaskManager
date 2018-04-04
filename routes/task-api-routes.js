var db = require("../models");

module.exports = function(app) {

  app.post("/api/posts", function(req, res) {
      // Add sequelize code for creating a Task using req.body.result.parameters,
      // then return the result using res.send
    db.Task.create({
      task_text: req.body.queryResult.parameters.taskName,
      task_date: req.body.queryResult.parameters.date,
      isdone: 0,
      user: {
      	username: "SCL",
      	email: "S@L.com",
      	password: "test"
      }
      // UserId: 1
    }, {include: [db.User]}
    ).then(function(dbPost) {
      var responseToUser = "task has been successfully entered";
      var responseJson = {fulfillmentMessages[0].text.text[0]: responseToUser}; //currently only text, need to add in speech
      res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
      res.send(responseJson);
    });
  });

  app.post("/api/update", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    var taskName = req.body.queryResult.parameters.taskName;

    db.Task.update({
      isdone: 1,
      }, {
      where: {
        task_text: taskName
        }
      }
    ).then(function(dbPost) {
      var responseToUser = "task has been successfully entered as complete";
      var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
      res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
      res.send(responseJson);
    });
  });

  app.post("/api/delete", function(req, res) {
    var taskName = req.body.queryResult.parameters.taskName;
    
    db.Task.destroy({
      where: {
        task_text: taskName
      }
    }).then(function(dbPost) {
      var responseToUser = "task has been successfully deleted";
      var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
      res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
      res.send(responseJson);
    });
  });

  //get all tasks from the database
  app.get("/api/posts", function(req, res) {
    db.Task.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });


//get all of the tasks for a individual user
  // app.get("/api/posts/:id", function(req, res) {
  //   db.Post.findAll({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     console.log(dbPost);
  //     res.json(dbPost);
  //   });
  // });
};
