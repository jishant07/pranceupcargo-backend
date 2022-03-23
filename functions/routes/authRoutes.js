var authRouter = require('express').Router();
var authController = require('../controllers/authController')

authRouter.route("/signup").post(authController.signUp)

module.exports = authRouter;