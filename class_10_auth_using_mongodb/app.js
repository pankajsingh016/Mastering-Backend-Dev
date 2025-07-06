const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    try {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          user: username,
          email: email,
          password: hash,
          age: age,
        });
      });
      
      let token = jwt.sign({email},"shazam");
      res.cookie("token",token);
      res.send('createdUser');

    } catch (err) {
      console.log(err);
    }
  });
});

app.get("/login",async(req,res)=>{
  res.render('login');
})

app.post("/login", async (req,res)=>{

    let {email, password } = req.body;
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send("Something went wrong");
    console.log(user.password,password);
    bcrypt.compare(password, user.password, (err,result)=>{
      if(result){
        console.log(result);
        let token = jwt.sign({email},"shazam");
        res.cookie("token",token);
        res.send('You are Loged In');
    }
    else{
      res.send('something went wrong')
    }
    });
});

app.post("/logout",(req,res)=>{
  res.cookie("token"," ");
  res.redirect("/")
});

app.listen(3000);
