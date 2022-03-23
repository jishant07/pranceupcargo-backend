var quoteRouter = require('express').Router()
var quoteController = require('../controllers/quoteController')

quoteRouter.route("/placeOnHold").post(quoteController.placeOnHold)
quoteRouter.route("/listAllQuotes").get(quoteController.getAllQuotes)
quoteRouter.route("/getQuoteById").get(quoteController.getQuoteById)

module.exports = quoteRouter