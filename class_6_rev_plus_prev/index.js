const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// static files are images audio videos

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create",(req,res)=>{
    console.log(req.body);

    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error creating file");
        }
        console.log("File created successfully");
        res.redirect("/");
    })
});

app.listen(3000);
