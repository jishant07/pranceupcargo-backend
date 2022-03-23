var authController = {}
var authModel = require('../models/authModel');
const globalModel = require('../models/globalModel');

authController.signUp = (req,res) =>{
    authModel.singup(req.body).then(result =>{
        res.json(globalModel.success(result))
    }).catch(err =>{
        res.json(globalModel.failure(err))
    })
}

module.exports = authController