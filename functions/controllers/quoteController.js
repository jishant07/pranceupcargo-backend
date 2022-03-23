var quoteController = {}
const globalModel = require('../models/globalModel');
var quoteModel = require('../models/quoteModel');

quoteController.placeOnHold = (req,res) =>{
    quoteModel.placeOnHold(req.data).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        console.log("ERROR PLACING QUOTE ON HOLD", err)
        res.json(globalModel.failure(err))
    })
}

module.exports = quoteController