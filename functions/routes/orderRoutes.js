var orderRouter = require('express').Router()
var orderController = require('../controllers/orderController')
var uploadMiddleware = require("../middlewares/uploadMiddleware")

orderRouter.route("/placeNewOrder").post(uploadMiddleware,orderController.placeNewOrder)
orderRouter.route("/listOrders").get(orderController.listOrders)
orderRouter.route("/getOrderById").post(orderController.getOrderById)

orderRouter.route("/editOrder").post(orderController.editOrder)
orderRouter.route("/getSignedUrl").post(orderController.getSignedUrl)
orderRouter.route("/uploadNewFile").post(uploadMiddleware, orderController.uploadNewFile)

module.exports = orderRouter