var orderController = {}
var orderModel = require('../models/orderModel')
var globalModel = require('../models/globalModel')

orderController.placeNewOrder = (req, res) =>{
    orderModel.placeNewOrder(JSON.parse(req.body.body),req.files,req.userInfo.uid).then(result =>{
        res.json(globalModel.success("Order Placed Successfully"))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

orderController.listOrders = (req,res) =>{
    if(req.query.orderState)
    {
        orderModel.listOrders(req.query.orderState,req.userInfo).then(result =>{
            res.json(globalModel.success(result))
        }).catch(err =>{
            console.log("ERROR FETCHING ORDERs",err)
            res.json(globalModel.failure(err))
        })
    }else{
        res.json(globalModel.failure("Incomplete Request"))
    }
}

orderController.getOrderById = (req,res) =>{
    orderModel.getOrderById(req.body.orderId).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

module.exports = orderController