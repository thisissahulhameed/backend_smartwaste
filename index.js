const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 5000;

const twilioAccountSid = "AC2dd7ed4a94da92836966cf5b712b268c";
const twilioAuthToken = "5e89cbb5deb8ec85d9a4a5b0b2c6e7e6";
const twilioPhoneNumber = "+16206229317";
const recipientPhoneNumber = "+919360116541";

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/sendSMS", (req, res) => {
  
  twilioClient.messages
    .create({
      body: req.body.message,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber,
    })
    .then(() => {
      console.log("SMS sent successfully!");
      res.status(200).json({ message: "SMS sent successfully!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to send SMS." });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
