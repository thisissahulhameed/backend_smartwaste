const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 5000;

const twilioAccountSid = "AC0c849aeaf5a18c69622ae27530c4f1f6";
const twilioAuthToken = "085ff209e2f6ad79577954b1c01e0e60";
const twilioPhoneNumber = "+12706123702";
const recipientPhoneNumber = "+917708966367";

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("this is working fine");
})

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
