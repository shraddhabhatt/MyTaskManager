require("dotenv").config();
var twilio = require('twilio'); //download the twilio npm package
var keys = require("../../../keys.js");

var defaultphone = keys.twilio.number;
var userphone = "+12072515500";
//var userphone;

var client = new twilio(keys.twilio.accountSid, keys.twilio.authToken);

var moment = require('moment');

var reminderTime = moment().subtract(12, 'hours').format("YYYY-MM-DD HH:mm:ss");

var db = require("../../../models");

db.sequelize.query('SELECT task_text FROM tasks WHERE task_date <=?',
  { replacements: [reminderTime], type: db.sequelize.QueryTypes.SELECT }
).then(tasks => {
  tasks.forEach(function(row){
    client.messages.create({
        body: row.task_text,
        to: userphone,  // Text this number insert from the database
        from: defaultphone // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
  });
});

db.sequelize.query('SELECT phonenumber FROM users WHERE id =?',
  { replacements: ["1"], type: db.sequelize.QueryTypes.SELECT }
).then(users => {
  userphone = users.phonenumber;
  console.log("this code is working");
});
