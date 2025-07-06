const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "harsh");
  res.send("done");
});

app.get("/read", (req, res) => {
  console.log(req.cookies);
  console.log(req.cookies.token);
  let data = jwt.verify(req.cookies.token,"secret");
  console.log(data);
  res.send("read");
});

app.get("/bcrypt", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash("123456", salt, (err, hash) => {
      console.log(hash);
    });
  });
  res.send("bcrypt");
});

app.get("/jwt", (req, res) => {
  let token = jwt.sign({ email: "harsh@gmail.com" }, "secret");
  res.cookie("token", token);
  console.log(token);
  res.send('Hi JWT');
});

app.listen(3000);
