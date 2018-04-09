var db = require("../models");
var fs = require("fs");
var multer = require('multer'); 

module.exports = function(app) {

var Storage = multer.diskStorage({ 
    destination: function (req, file, callback) { 
        callback(null, "../MyTaskManager/public/assets/uploaded_images"); 
    }, 
    filename: function (req, file, callback) { 
        callback(null, file.originalname); 
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
              n_image: req.body.n_image,
              UserId: user.id
                
        }).then(function(dbPost) {
           res.json(dbPost);
        });
    });
});
app.post("/api/upload", function(req,res){

   var filename; 
   upload(req, res, function (err) { 
   if (err) {
         console.log("ERRROR :: "+err);
          return res.end("Something went wrong!"); 
   }
   else{
      var filenames = req.files.map(function(file) {
        filename = file.filename;
        console.log(file.filename); // or file.originalname
      });
   }
   res.send(filename); 
  });
});

//get all notes from the database
 app.get("/api/notes", function(req, res) {
    console.log(res);
    db.Note.findAll({})
    .then(function(dbPost) {
    res.json(dbPost);
    });
  });

// get a single note record
 app.get("/api/notes/:header/:userid", function(req, res) {
    console.log("Note Searching");
    db.Note.findOne({ where: {
            n_header: req.params.header,
            UserId: req.params.userid
          }}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

 // update a note
  app.put("/api/notes/edit", function(req, res) {
    db.Note.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

}