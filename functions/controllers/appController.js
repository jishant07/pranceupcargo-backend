let appController = {}
const appModel = require('../models/appModel');
const globalModel = require("../models/globalModel")

appController.addAirport = (req,res) =>{
    appModel.addAirport(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

appController.addPort = (req,res) =>{
    appModel.addPort(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

appController.listAirports = (req,res) =>{
    appModel.listAirports().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

appController.listPorts = (req,res) =>{
    appModel.listPorts().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

module.exports = appController