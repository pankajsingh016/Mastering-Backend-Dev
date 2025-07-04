const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let allusers = await userModel.find();
  res.render("read", { users: allusers });
});

app.get("/delete/:userid", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.userid });
  res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});


app.post("/update/:userid", async (req, res) => {
  let { image_url, name, email } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { name: name, email: email, image_url: image_url },
    {new:true}
  );
  res.redirect('/read');
});


app.post("/create", async (req, res) => {
  let createUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    image_url: req.body.image_url,
  });
  console.log("user added");
  res.redirect("/read");
});

app.listen(3000);
