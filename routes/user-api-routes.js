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
    }).then(function(dbPost) {
        res.json(dbPost);
      });
  });
}; 