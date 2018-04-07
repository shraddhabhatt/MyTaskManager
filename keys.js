
require("exports"); //download the exports npm package

exports.twilio = {
  accountSid: process.env.TWILIO_ACCOUNTSID,
  authToken: process.env.TWILIO_AUTHTOKEN,
  number: process.env.TWILIO_NUMBER
}
