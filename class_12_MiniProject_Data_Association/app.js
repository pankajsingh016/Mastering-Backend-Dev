const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const userModel = require("./models/user");
const postModel = require("./models/post");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ entended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  res.send("HEY");
});

app.post("/register", async (req, res) => {
  let { email, password, username, name, age } = req.body;
  let user = await userModel.findOne({ email });

  if (user) {
    return res.status(500).send("User already registered");
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username: username,
        name: name,
        password: hash,
        email: email,
        age: age,
      });
      const token = jwt.sign({ email: email, userid: user._id }, "shazam");
      res.cookie("token", token);
      res.send("Registered");
    });
  });
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = userModel.findOne({ email });

  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: email, userid: user._id }, "shazam");
      res.cookie("token", token);
      res.status(200).send("You are Logged In");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/profile", Isloggedin, (req, res) => {
  console.log(req.user);
  res.render("login");
});

// middleware for protected routes
function Isloggedin(req, res, next) {
  if (req.cookies.token === "") {
    res.status(404).redirect("/login");
  } else {
    const data = jwt.verify(token, "shazam");
    req.user = data;
    next();
  }
}

app.listen(3000);
