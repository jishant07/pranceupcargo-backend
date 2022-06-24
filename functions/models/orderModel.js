var orderModel = {}
var firebase = require('../database')
var quoteModel = require("../models/quoteModel")

var dbref = firebase.firestore();

orderModel.placeNewOrder = (body,files,uid) =>{
    return new Promise(async (resolve, reject) =>{
        body.orderAmount = await quoteModel.getCost(body).catch(err =>{
            reject(err)
        })
        dbref.collection('orders').add({...body, uid}).then(result =>{
            var orderId = result.id;
            var fileData = {}
            var uploadArray = []
            files.forEach(file =>{
                var serverFileLocation = `${orderId}/${file.fieldname}`
                uploadArray.push(orderModel.uploadDocument(file.buffer, serverFileLocation, file.fieldname))
                fileData[file.fieldname] = serverFileLocation
            })
            Promise.all(uploadArray).then(fileArray =>{
                resolve(fileArray)
            }).catch(err =>{
                console.log("FILE UPLOAD ERROR", err)
                reject(err)
            })
        }).catch(err =>{
            console.log("PLACING NEW ORDER ERROR", err)
        })
    })
}

orderModel.uploadDocument = (localFileBuffer, serverFileLocation, fieldName) =>{
    var storage_ref = firebase.storage().bucket("gs://pranceup-cargo.appspot.com")
    const file = storage_ref.file(serverFileLocation)
    return new Promise((resolve, reject) =>{
        file.save(localFileBuffer).then(()=>{
            resolve({[fieldName]: serverFileLocation})
        }).catch(err =>{
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