const auth = require('express').Router();

auth.get("/test",(req,res)=>{
    res.send("Auth Router called");
})

module.exports = auth;