var authModel = {}
var firebase = require('../database');
var dbref  = firebase.firestore(); 

authModel.singup = (data) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('users').add({...data}).then(result =>{
            resolve(result)
        }).catch(err =>{
            console.log("ERROR SIGING UP", err)
            reject(err)
        })
    })
}

module.exports = authModel;