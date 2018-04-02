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


