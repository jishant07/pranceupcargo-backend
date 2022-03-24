var orderModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();

orderModel.placeOrder = (data) =>{
    data.body.orderStatus = "PLACED";
    data.body.cost = "DUMMY";
    data.body.uid = data.userInfo.uid;
    return new Promise((resolve,reject) =>{
        dbref.collection('orders').add({...data.body}).then(result =>{
            resolve(result)
        }).catch(err =>{
            console.log("ERROR PLACING ORDER", err)
            reject(err)
        })
    })
}

orderModel.listOrders = (userInfo) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('orders').where("uid","==",userInfo.uid).get().then(snapshot =>{
            if(!snapshot.empty){
                var data = []
                snapshot.forEach(snap =>{
                    data.push({id:snap.id,data:snap.data()})
                })
                resolve(data)
            }else{
                resolve("No Orders found")
            }
        }).catch(err =>{
            console.log("ERROR FETCHING ORDERS", err);
            reject(err);
        })
    })
}

orderModel.getOrderById = (orderId) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('orders').doc(orderId).get()
        .then(result =>{
            if(result.exists) {
                resolve(result.data())
            }else{
                resolve("Order Not found")
            }
        }).catch(err =>{
            reject("ERROR GETTING ORDER BY ID", err)
        })
    })
}

module.exports = orderModel