const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singup.html");
});
app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/6840460d5d";
  const options = {
    method: "POST",
    auth: "weronika:8d3f0f2efcd2b3a12ddfcf2d656325f1-us9",
  };
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
app.post("/success", (req, res) => {
  res.redirect("/");
});
app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is runing on 3000");
});

// api key
// 8d3f0f2efcd2b3a12ddfcf2d656325f1-us9
// list id:
// 6840460d5d
