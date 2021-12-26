const functions = require("firebase-functions");
const app = require('express')();

exports.auth = functions.https.onRequest(require("./routes/authRoutes"))
exports.api = functions.https.onRequest(app)