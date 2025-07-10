const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ entended: true }));
app.use(cookieParser());


// entry page
app.get("/", (req, res) => {
  res.render("index");
});


//To register user
app.post("/register", async (req, res) => {
  let { email, password, username, name, age } = req.body;
  let user = await userModel.findOne({ email });
  console.log(user);

  if (user) {
    return res.status(500).send("User already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  let newuser = await userModel.create({
    username: username,
    name: name,
    password: hash,
    email: email,
    age: age,
  });
  const token = jwt.sign({ email: email, userid: newuser._id }, "shazam");
  res.cookie("token", token);
  res.send("Registered");
});


//login page
app.get("/login", async (req, res) => {
  res.render("login");
});


// login page - input
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email: email, userid: user._id }, "shazam");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    }
  });
});


// logout point
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});


// create a post route from /profile
app.post("/post", Isloggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let {content } = req.body;
  let post = await postModel.create({
    user:user._id,
    content:content,  
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile');
});

//like a post
app.get("/like/:id",Isloggedin,async(req,res)=>{

  let post = await postModel.findOne({_id:req.params.id}).populate("user");

  if(post.likes.indexOf(req.user.userid)===-1){
    post.likes.push(req.user.userid);
  } else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1);
  }

  await post.save();
  res.redirect("/profile");
})

//edit a post
app.get("/edit/:id",Isloggedin,async(req,res)=>{

  let post = await postModel.findOne({_id:req.params.id}).populate("user");
  res.render('edit',{post});
})
// edit a post push the edited text to the db
app.post("/edit/:id",Isloggedin,async(req,res)=>{
  let {content} = req.body;
  let post = await postModel.findOneAndUpdate({_id:req.params.id},{$set:{content:content}});
  res.redirect("/profile");
})


// after login user sent here
app.get("/profile", Isloggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  res.render("profile", { user });
});


// middleware for protected routes
function Isloggedin(req, res, next) {
  if (req.cookies.token === "") {
    res.status(404).redirect("/login");
  } else {
    // console.log(req.cookies.token);
    const data = jwt.verify(req.cookies.token, "shazam");
    req.user = data;
    next();
  }
}
const PORT=3000
app.listen(PORT,()=>{
  console.log(`Backend is up an running at ${PORT}`)
});
