var quoteRouter = require('express').Router()
var quoteController = require('../controllers/quoteController')

quoteRouter.route("/placeOnHold").post(quoteController.placeOnHold)

module.exports = quoteRouter