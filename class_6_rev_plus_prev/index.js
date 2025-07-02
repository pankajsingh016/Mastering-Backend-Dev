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

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading file");
    }
    res.render("show", { title: req.params.filename, content: data });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit",{fileName:req.params.filename});
});

app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error renaming file");
        }
        res.redirect("/");
    });
});

app.post("/create", (req, res) => {
  console.log(req.body);

  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error creating file");
      }
      console.log("File created successfully");
      res.redirect("/");
    }
  );
});

app.listen(3000);
