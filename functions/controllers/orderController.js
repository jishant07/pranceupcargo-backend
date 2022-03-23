var orderController = {}
var orderModel = require('../models/orderModel')
var globalModel = require('../models/globalModel')

orderController.placeOrder = (req,res) =>{
    orderModel.placeOrder(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR PLACING ORDER", err);
        res.json(globalModel.failure(err))
    })
}

module.exports = orderController