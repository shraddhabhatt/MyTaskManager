// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
// Dependencies
// =============================================================
var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {
//login
  app.get("/", function(req, res) {
   res.render("login");
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

app.get("/task", function(req, res) {
    res.render("task");
  });

  app.get("/notes", function(req, res) {
    res.render("notes");
  });

}; 