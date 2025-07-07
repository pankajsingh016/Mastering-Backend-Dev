const express = require('express')
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/posts")

app.get("/",(req,res)=>{
    res.send("HEY");
});

app.get("/create",async (req,res)=>{
   let user = await userModel.create({
        username:"harsh",
        age:25,
        email:"harsh@gmail.com"
    });
    res.send('User Created');
});

app.get("/create/post", async (req,res)=>{
    let post = await postModel.create({
        postdata:"hello, how are you guys",
        user:"2343423",
    });

    let user = await userModel.findOne({_id:"343"});
    user.posts.push(post._id);
    await user.save();
    res.send({post,user});
});

app.listen(3000);