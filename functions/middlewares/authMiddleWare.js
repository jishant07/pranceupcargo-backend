const firebase = require("../database")

module.exports = (req,res,next) =>{
    if(req.headers.token){
        firebase.auth().verifyIdToken(req.headers.token).then(userInfo =>{
            req.userInfo = userInfo
            next();
        }).catch(err =>{
            res.json({
                status:"failure",
                message:err
            })
        })
    }else{
        res.json({
            status:"failure",
            message:"Secure route"
        })
        next("Unauthorised")
    }
}