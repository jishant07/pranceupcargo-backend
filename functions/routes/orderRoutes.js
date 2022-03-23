var orderRouter = require('express').Router()
var orderController = require('../controllers/orderController')

orderRouter.route("/placeOrder").post(orderController.placeOrder)
orderRouter.route("/listOrders").get(orderController.listOrders)
orderRouter.route("/getOrderById").post(orderController.getOrderById)

module.exports = orderRouter