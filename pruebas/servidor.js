const express = require ("express");
const port= process.env.PORT || 80;
require("dotenv").config();
const app = express();

// middleware
var saludo=(req, res, next)=>{
    console.log("Hola");
    next();
}

app.get("/",saludo,(req,res)=>{
    res.send("Estas en RAIZ")
})

app.get("/home",saludo,(req,res)=>{
    res.send("Estas en HOME")
})

app.listen(port,()=>{
    console.log("Servidor en http://localhost" + port);
    
});