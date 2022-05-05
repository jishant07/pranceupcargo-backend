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
    return new Promise(async (resolve,reject) =>{
        var userDocument = await dbref.collection('users').doc(userInfo.uid).get()
        let userData = userDocument.data();
        let orderPromise;
        if(userData.isAdmin && userData.isAdmin == true){
            orderPromise = dbref.collection("orders").get()
        }else{
            orderPromise = dbref.collection("orders").where("uid","==", userDocument.id).get()
        }
        orderPromise.then(snapshot =>{
            if(snapshot.empty){
                reject("No Orders Found")
            }else{
                var orderList = []
                snapshot.forEach(snap =>{
                    orderList.push({
                        id : snap.id,
                        ...snap.data(0)
                    })
                })
                resolve(orderList)
            }
        }).catch(err =>{
            console.log("LIST ORDERS ERR", err)
            reject(err)
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