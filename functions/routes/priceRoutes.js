var priceRouter = require('express').Router()
var priceController = require('../controllers/priceController')
var adminMiddleware = require("../middlewares/adminMiddleWare")

priceRouter.use(adminMiddleware);

priceRouter.route("/addPriceToPort").post(priceController.addPriceToPort)
priceRouter.route("/addPriceToAirport").post(priceController.addPriceToAirport)

module.exports = priceRouter