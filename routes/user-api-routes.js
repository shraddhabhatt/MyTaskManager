var db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  // POST route for saving a new post
  app.post("/api/register", function(req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function(dbresponse) {
        res.json(dbresponse);
      });
  });

  // Get route for retrieving user data
  app.get("/api/login/:email/:password", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        email: req.params.email,
        password: req.params.password
      }
    }).then(function(dbresponse) {
        console.log("######### "+dbresponse.email);
        res.json(dbresponse);
      });
  });

  // Get route for retrieving user data
  app.get("/api/login/:email", function(req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then(function(dbresponse) {
        console.log("##### EMAIL #### "+dbresponse.email);
        res.json(dbresponse);
      });
  });


}; 