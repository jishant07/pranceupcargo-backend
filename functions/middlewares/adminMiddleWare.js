const firebase = require("../database")

module.exports = (req,res,next) =>{
    firebase.firestore().collection('users').doc(req.userInfo.uid).get().then(userDocument =>{
        if(userDocument.data().isAdmin){
            req.userInfo.isAdmin = userDocument.data().isAdmin
            next();
        }else{
            res.json({
                status:"failure",
                message:"Admin Route Accessed"
            })
            next("Admin Route Accessed");
        }
    })
}