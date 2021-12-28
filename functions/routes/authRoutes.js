const auth = require('express').Router();
const firebase = require("../database")

auth.get("/test",(req,res)=>{
    res.send("Auth Router called");
})

module.exports = auth;