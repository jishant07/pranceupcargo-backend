var authModel = {}
var firebase = require('../database');
var dbref  = firebase.firestore(); 

authModel.signup = (data) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('users').doc(data.userInfo.user_id).set({...data.body,email:data.userInfo.email}).then(result =>{
            resolve(result)
        }).catch(err =>{
            console.log("ERROR SIGING UP", err)
            reject(err)
        })
    })
}

module.exports = authModel;