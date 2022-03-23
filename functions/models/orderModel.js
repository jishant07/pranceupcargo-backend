var orderModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();

orderModel.placeOrder = (data) =>{
    data.orderStatus = "PLACED";
    data.cost = "DUMMY";
    return new Promise((resolve,reject) =>{
        dbref.collection('orders').add({...data}).then(result =>{
            resolve(result)
        }).catch(err =>{
            console.log("ERROR PLACING ORDER", err)
        })
    })
}

module.exports = orderModel