const express = require("express");

const app = express();

// routes /

app.use(function (req, res, next) {
  console.log("middleware chala");
  next();
});

app.get("/", (req, res) => {
  res.send("Champion mera anuj");
});

app.get("/profile", (req, res,next) => {
    return next(new Error("Something Went Wrong"));
    res.send("Champion uska coach");

});


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(3000);
