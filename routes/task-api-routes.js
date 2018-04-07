var db = require("../models");
var where = require('node-where');
// var geolocation = require('geolocation');

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

      else if(req.body.result.action == "note.add"){
          // geolocation.getCurrentPosition(function (err, position) {
          //   if (err) throw err
          //   console.log(position)
          where.is("Portsmouth, NH", function(err, result) {
            if (result) {

              console.log('Lat: ' + result.get('lat'));
              console.log('Lng: ' + result.get('lng'));
              var lat = result.get('lat');
              var long = result.get('lng');
              var location = { type: 'Point', coordinates: [lat , long]};
              console.log(location);

              db.User.find({where: {id: 1}}).then(function(user) 
            {
               db.Note.create({
                  n_header: req.body.result.parameters.noteHeader,
                  n_notedate: req.body.result.parameters.noteDate,
                  n_location: lat + ", " + long,
                  n_content: req.body.result.parameters.noteContent,
                  UserId: user.id
                }).then(function(dbPost) {
                  var responseToUser = "note has been successfully entered";
                  var responseJson = {speech: responseToUser}; //currently only text, need to add in speech
                  res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                  res.send(responseJson);
                  
                });
              });
            }
          });          
        // });
      }

      else if(req.body.result.action == "note.update"){
         where.is("Portsmouth, NH", function(err, result) {
          if (result){
              console.log('Lat: ' + result.get('lat'));
              console.log('Lng: ' + result.get('lng'));
              var lat = result.get('lat');
              var long = result.get('lng');

              if(req.body.result.parameters.noteContent && req.body.result.parameters.noteDate){
                  db.Note.find({where: {n_header: req.body.result.parameters.noteHeader}}).then(function(note){
                    db.Note.update({
                    n_content: note.n_content + " // " + req.body.result.parameters.noteContent,
                    n_notedate: req.body.result.parameters.noteDate,
                    n_location: lat + ", " + long 
                    }, {
                    where: {
                      n_header: req.body.result.parameters.noteHeader
                      }
                    }
                  ).then(function(dbPost) {
                    var responseToUser = "note has been successfully updated";
                    var responseJson = {speech: responseToUser}; //currently only text, need to add in speech
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(responseJson);
                  });
              });
            }
            else{
                db.Note.find({where: {n_header: req.body.result.parameters.noteHeader}}).then(function(note){
                    db.Note.update({
                    n_content: note.n_content + " // " + req.body.result.parameters.noteContent,
                    n_location: lat + ", " + long
                    }, {
                    where: {
                      n_header: req.body.result.parameters.noteHeader
                      }
                    }
                  ).then(function(dbPost) {
                    var responseToUser = "note has been successfully updated";
                    var responseJson = {speech: responseToUser}; //currently only text, need to add in speech
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(responseJson);
                  });
                });
            }         
          }
         }); 
          
      }     
    });
      

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
          //var responseToUser = "task has been successfully entered";
          //var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
         //res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
          res.json(dbPost);
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