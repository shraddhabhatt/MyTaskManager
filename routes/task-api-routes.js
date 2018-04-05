var db = require("../models");

module.exports = function(app) {

  app.post("/api/posts", function(req, res) {
      // Add sequelize code for creating a Task using req.body.result.parameters,
      // then return the result using res.send

      if(req.body.result.action == "task.add"){
          db.User.find({where: {id: 1}}).then(function(user) 
        {
           db.Task.create({
              task_text: req.body.result.parameters.taskName,
              task_date: req.body.result.parameters.date,
              isdone: 0,
              UserId: user.id
            }).then(function(dbPost) {
              var responseToUser = "task has been successfully entered";
              var responseJson = {speech: responseToUser}; //currently only text, need to add in speech
              res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
              res.send(responseJson);
              
            });
          });
      }

      else if (req.body.result.action == "task.complete"){
          var taskName = req.body.result.parameters.taskName;

            db.Task.update({
              isdone: 1,
              }, {
              where: {
                task_text: taskName
                }
              }
            ).then(function(dbPost) {
              var responseToUser = "task has been successfully entered as complete";
              var responseJson = {speech: responseToUser}; //currently only text, need to add in speech
              res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
              res.send(responseJson);
            });
      }

      else if (req.body.result.action == "task.delete"){
            var taskName = req.body.result.parameters.taskName;

              db.Task.destroy({
                where: {
                  task_text: taskName
                }
              }).then(function(dbPost) {
                var responseToUser = "task has been successfully deleted";
                var responseJson = {speech: responseToUser}; //currently only text, need to add in speech
                res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                res.send(responseJson);
              });
      }

        
    });
      

  // app.post("/api/update", function(req, res) {
  //   // Add code here to update a post using the values in req.body, where the id is equal to
  //   // req.body.id and return the result to the user using res.json
  //   var taskName = req.body.result.parameters.taskName;

  //   db.Task.update({
  //     isdone: 1,
  //     }, {
  //     where: {
  //       task_text: taskName
  //       }
  //     }
  //   ).then(function(dbPost) {
  //     var responseToUser = "task has been successfully entered as complete";
  //     var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
  //     res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  //     res.send(responseJson);
  //   });
  // });

  // app.post("/api/delete", function(req, res) {
  //   var taskName = req.body.queryResult.parameters.taskName;

  //   db.Task.destroy({
  //     where: {
  //       task_text: taskName
  //     }
  //   }).then(function(dbPost) {
  //     var responseToUser = "task has been successfully deleted";
  //     var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
  //     res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  //     res.send(responseJson);
  //   });
  // });

  //get all tasks from the database
  app.get("/api/posts", function(req, res) {
    db.Task.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });
  
  // add new task associated with user id manually using the SET TASK Button
  app.post("/api/task/new", function(req, res) {
      // Add sequelize code for creating a Task using req.body.result.parameters,
      // then return the result using res.send
    db.User.find({where: {email: req.body.email}}).then(function(user) 
    {
        db.Task.create({
          task_text: req.body.task_text,
          task_date: req.body.task_date,
          task_message: req.body.task_message,
          isdone: 0,
          UserId: user.id
          // UserId: 1
        }).then(function(dbPost) {
          var responseToUser = "task has been successfully entered";
          var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
          res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
          res.send(responseJson);
        });
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