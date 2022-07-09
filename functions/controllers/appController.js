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

appController.getPortById = (req,res) =>{
    appModel.getPortById(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("GETTING PORT BY ID ERR", err)
        res.json(globalModel.failure(err))
    })
}

appController.getAirportById = (req,res) =>{
    appModel.getAirportById(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("GETTING PORT BY ID ERR", err)
        res.json(globalModel.failure(err))
    })
}

appController.getIndianPorts = (req,res) =>{
    appModel.getIndianPorts().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

appController.getIndianAirPorts = (req,res) =>{
    appModel.getIndianAirports().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

appController.getAllPorts = (req,res) =>{
    appModel.getAllPorts().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("Get All Ports List error", err)
        res.json(globalModel.failure(err))
    })
}

appController.getAllAirports = (req, res) =>{
    appModel.getAllAirports().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("Get All Airports List Error", err)
        res.json(globalModel.failure(err))
    })
}

appController.editPort = (req, res) =>{
    appModel.editPort(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("EDIT PORT ERROR", err)
        res.json(globalModel.failure(err))
    })
}

appController.editAirport = (req, res) =>{
    appModel.editAirport(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("EDIT AIRPORT ERROR", err)
        res.json(globalModel.failure(err))
    })
}

appController.getUsers = (req,res) =>{
    appModel.getUsers().then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

appController.editUser = (req, res) =>{
    appModel.editUser(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR IN EDITING USER", err)
        res.json(globalModel.failure(err))
    })
}

module.exports = appController