let appController = {}
const appModel = require('../models/appModel');

appController.addCountry = (req,res) =>{
    if(req.body.countryName){
        appModel.addCountry(req.body).then(result =>{
            res.json({
                status:"success", 
                message:result
            })
        }).catch(err =>{
            res.json({
                status:"failure",
                message:err
            })
        })
    }
}

appController.addPortToCountry = (req,res) =>{
    if(req.body.placeId){
        appModel.addPortToCountry(req.body).then(result =>{
            res.json({
                status:"success",
                message:result
            })
        }).catch(err =>{
            console.log(err);
            res.json({
                status:"failure", 
                message:err
            })
        })
    }else{
        res.json({
            status:"failure", 
            message:"In-complete Request"
        })
    }
}

appController.addAirportToCountry = (req,res) =>{
    if(req.body.placeId){
        appModel.addAirportToCountry(req.body).then(result =>{
            res.json({
                status:"success",
                message:result
            })
        }).catch(err =>{
            res.json({
                status:"failure", 
                message:err
            })
        })
    }else{
        res.json({
            status:"failure", 
            message:"In-complete Request"
        })
    }
}

appController.getPorts = (req,res) =>{
    if(req.body.placeId){
        appModel.getPorts(req.body.placeId).then(result =>{
            res.json({
                status:"success", 
                message:result
            })
        }).catch(err =>{
            res.json({
                status:"failure", 
                message:err
            })
        })
    }else{
        res.json({
            status:"failure", 
            message:"In-complete Request"
        })
    }
}

appController.getAirports = (req,res) =>{
    if(req.body.placeId){
        appModel.getAirports(req.body.placeId).then(result =>{
            res.json({
                status:"success", 
                message:result
            })
        }).catch(err =>{
            res.json({
                status:"failure", 
                message:err
            })
        })
    }else{
        res.json({
            status:"failure", 
            message:"In-complete Request"
        })
    }
}

appController.listCountries = (req,res) =>{
    appModel.listCountries().then(result =>{
        res.json({
            status:"success", 
            message:result
        })
    }).catch(err =>{
        res.json({
            status:"failure", 
            message:err
        })
    })
}

module.exports = appController