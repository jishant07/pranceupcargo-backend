var orderRouter = require('express').Router()
var orderController = require('../controllers/orderController')

orderRouter.route("/placeOrder").post(orderController.placeOrder)

module.exports = orderRouter