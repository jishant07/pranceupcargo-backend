const functions = require("firebase-functions");
const app = require('express')();

app.use(require("./middlewares/authMiddleWare"));
app.use("/auth",require("./routes/authRoutes"))

app.get("/",(req,res)=>{
    res.send("OK reached index app")
})

exports.api = functions.https.onRequest(app)