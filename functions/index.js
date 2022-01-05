const functions = require("firebase-functions");
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')

//app.use(require("./middlewares/authMiddleWare"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/app",require("./routes/appRoutes"))

exports.api = functions.https.onRequest(app)