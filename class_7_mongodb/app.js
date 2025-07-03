const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hey");
});

// Create a user
app.get("/create", async (req, res) => {
  let createduser = await userModel.create({
    name: "pankaj",
    username: "pankajsingh_016",
    email: "pankrj123@gmail.com",
  });
  res.send(createduser);
});

// Update a user
app.get("/update", async (req, res) => {
  // userModel.findOneUpdate(findone, update, {new:true})
  let updateuser = await userModel.findOneAndUpdate(
    { username: "pankajsingh_016" },
    { name: "Shiva", email: "shiva01@gmail.com" },
    { new: true }
  );
  res.send(updateuser);
});


// read a user
app.get("/read",async (req,res)=>{
    let readusers = await userModel.find();
    res.send(readusers);
})

//delete a user
app.get("/delete", async (req,res)=>{
    let users = await userModel.findOneAndDelete({name:'pankaj'});
    res.send(users);    
})

app.listen(3000);
