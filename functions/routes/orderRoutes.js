var orderRouter = require('express').Router()
var orderController = require('../controllers/orderController')
var uploadMiddleware = require("../middlewares/uploadMiddleware")

orderRouter.route("/placeNewOrder").post(uploadMiddleware,orderController.placeNewOrder)
//orderRouter.route("/placeOrderFromQuote").post(uploadMiddleware,orderController.placeOrderFromQuote)
orderRouter.route("/listOrders").get(orderController.listOrders)
orderRouter.route("/getOrderById").post(orderController.getOrderById)

module.exports = orderRouter