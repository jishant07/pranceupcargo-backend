var orderController = {}
var orderModel = require('../models/orderModel')
var globalModel = require('../models/globalModel')

orderController.placeOrder = (req,res) =>{
    var data = {body:req.body,userInfo:req.userInfo}
    orderModel.placeOrder(data).then(result =>{
        res.json(globalModel.success(result.id))
    }).catch(err =>{
        console.log("ERROR PLACING ORDER", err);
        res.json(globalModel.failure(err))
    })
}

orderController.listOrders = (req,res) =>{
    orderModel.listOrders(req.userInfo).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR FETCHING ORDERs",err)
        res.json(globalModel.failure(err))
    })
}

orderController.getOrderById = (req,res) =>{
    orderModel.getOrderById(req.body.orderId).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

module.exports = orderController