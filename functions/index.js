const functions = require("firebase-functions");
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(require("./middlewares/authMiddleWare"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/app",require("./routes/appRoutes"))
app.use("/auth",require("./routes/authRoutes"))
app.use("/price",require("./routes/priceRoutes"))
app.use("/order",require("./routes/orderRoutes"))
app.use("/quote",require("./routes/quoteRoutes"))

exports.api = functions.https.onRequest(app)