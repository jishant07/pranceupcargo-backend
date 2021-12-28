const firebase = require("../database")

module.exports = (req,res,next) =>{
    if(req.headers.token){
        firebase.admin.auth().verifyIdToken(req.headers.token).then(userInfo =>{
            req.userInfo = userInfo
            console.log(req.userInfo);
            next();
        }).catch(err =>{
            next(err)
        })
    }else{
        next("Unauthorised")
    }
}