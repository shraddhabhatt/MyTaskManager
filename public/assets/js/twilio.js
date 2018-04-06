require("dotenv").config();
var twilio = require('twilio'); //download the twilio npm package
var keys = require("../../../keys.js");

var defaultphone = keys.twilio.number;

var client = new twilio(keys.twilio.accountSid, keys.twilio.authToken);

client.messages.create({
    body: 'INSERT THE TASK HERE FROM THE DB',
    to: '+1207*******',  // Text this number insert from the database
    from: defaultphone // From a valid Twilio number
})
.then((message) => console.log(message.sid));
