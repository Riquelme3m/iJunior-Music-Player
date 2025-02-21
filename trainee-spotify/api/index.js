const app = require('./config/express-config');

app.use("/",(req,res)=>{
    res.send("Server is running");
})

app.listen(3030, console.log('API listening on port 3030'));



//Code that runs on vercel okay 

/*const express = require("express");

const app = express();

app.use("/",(req,res)=>{
    res.send("Server is running");
});

app.listen(3030,console.log("Server started on PORT 3030")); */