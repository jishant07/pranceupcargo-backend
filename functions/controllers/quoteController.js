var quoteController = {}
const globalModel = require('../models/globalModel');
var quoteModel = require('../models/quoteModel');

quoteController.placeOnHold = (req,res) =>{
    quoteModel.placeOnHold({body:req.body,userInfo:req.userInfo}).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR PLACING QUOTE ON HOLD", err)
        res.json(globalModel.failure(err))
    })
}

quoteController.getAllQuotes = (req,res) => {
    quoteModel.getAllQuotes(req.userInfo).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

quoteController.getQuoteById = (req,res) =>{
    quoteModel.getQuotesbyId(req.body.quoteId).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

module.exports = quoteController