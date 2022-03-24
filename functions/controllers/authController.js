var authController = {}
var authModel = require('../models/authModel');
const globalModel = require('../models/globalModel');

authController.signUp = (req,res) =>{
    var data = {body: {...req.body},userInfo:{...req.userInfo}}
    authModel.signup(data).then(result =>{
        res.json(globalModel.success(result.id))
    }).catch(err =>{
        console.log(err)
        res.json(globalModel.failure(err))
    })
}

module.exports = authController