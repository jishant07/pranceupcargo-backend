var admin = require("firebase-admin");
var serviceAccount = require("./creds.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pranceup-cargo-default-rtdb.firebaseio.com"
});

module.exports = admin.firestore();