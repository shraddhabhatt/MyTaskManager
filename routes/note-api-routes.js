var db = require("../models");
var fs = require("fs");
var multer = require('multer'); 

module.exports = function(app) {

var Storage = multer.diskStorage({ 
    destination: function (req, file, callback) { 
        callback(null, "../MyTaskManager/public/assets/uploaded_images"); 
    }, 
    filename: function (req, file, callback) { 
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); 
    } 
}); 
 
var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count 

app.post("/api/notes/new", function(req, res) {
      db.User.find({where: {email: req.body.email}}).then(function(user) 
      {
          db.Note.create({
              n_header: req.body.n_header,
              n_notedate: req.body.n_notedate,
              n_content: req.body.n_content,
              n_location: req.body.n_location,
              UserId: user.id
                  // UserId: 1
        }).then(function(dbPost) {
            var responseToUser = "Notes has been successfully entered";
            var responseJson = {fulfillmentText: responseToUser}; //currently only text, need to add in speech
            res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
            res.send("/notes");
        });
    });
});
app.post("/api/upload", function(req,res){

     upload(req, res, function (err) { 
     if (err) {
           console.log("ERRROR :: "+err);
            return res.end("Something went wrong!"); 
     }
     return res.end("File uploaded sucessfully!."); 
    });
  });
}
