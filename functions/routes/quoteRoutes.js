var quoteRouter = require('express').Router()
var quoteController = require('../controllers/quoteController')

quoteRouter.route("/placeOnHold").post(quoteController.placeOnHold)
quoteRouter.route("/listAllQuotes").get(quoteController.getAllQuotes)
quoteRouter.route("/getQuoteById").post(quoteController.getQuoteById)

module.exports = quoteRouter