var priceController = {}
var priceModel = require("../models/priceModel")
var globalModel = require("../models/globalModel")

priceController.addPriceToPort = (req,res) =>{
    priceModel.addPriceToPort(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR ADDING PRICE TO THE PORT",err)
    })
}

priceController.addPriceToAirport = (req,res) =>{
    priceModel.addPriceToPort(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR ADDING PRICE TO THE AIRPORT", err)
        res.json(globalModel.failure(err))
    })
}

module.exports = priceController