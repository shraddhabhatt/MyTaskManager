// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
// Dependencies
// =============================================================
var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {

	app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/htmls/login.html"));
  });

	app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/htmls/login.html"));
  });

	app.get("/task", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/htmls/task.html"));
  });

}; 