var orderModel = {}
var firebase = require('../database')
var quoteModel = require("../models/quoteModel")
var async = require("async")

var dbref = firebase.firestore();

orderModel.placeNewOrder = (body,files,uid) =>{
    return new Promise(async (resolve, reject) =>{
        body.orderAmount = await quoteModel.getCost(body).catch(err =>{
            reject(err)
        })
        body.orderStatus = "ACTIVE";
        dbref.collection('orders').add({...body, uid}).then(result =>{
            var orderId = result.id;
            var fileData = {}
            var uploadArray = []
            files.forEach(file =>{
                var serverFileLocation = `${orderId}/${file.fieldname}.${file.originalname.split(".")[1]}`
                uploadArray.push(orderModel.uploadDocument(file.buffer, serverFileLocation, file.fieldname))
                fileData[file.fieldname] = serverFileLocation
            })
            uploadArray.push(dbref.collection('orders').doc(orderId).update({"files": {...fileData}}))
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

orderModel.listOrders = (orderState,userInfo) =>{
    return new Promise(async (resolve,reject) =>{
        var userDocument = await dbref.collection('users').doc(userInfo.uid).get()
        let userData = userDocument.data();
        let orderPromise;
        if(orderState && orderState == "ACTIVE")
        {
            if(userData.isAdmin && userData.isAdmin == true){
                orderPromise = dbref.collection("orders").where("orderStatus","!=", "COMPLETED").get()
            }else{
                orderPromise = dbref.collection("orders").where("uid","==", userDocument.id).where("orderStatus","!=", "COMPLETED").get()
            }
        }else if(orderState && orderState == "COMPLETED"){
            if(userData.isAdmin && userData.isAdmin == true){
                orderPromise = dbref.collection("orders").where("orderStatus","==", "COMPLETED").get()
            }else{
                orderPromise = dbref.collection("orders").where("uid","==", userDocument.id).where("orderStatus","==", "COMPLETED").get()
            }
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
                var finalOrderArray = []
                var promiseArray = []
                async.forEach(orderList, (order, eachCallback)=>{
                    promiseArray = []
                    if(order.modeOfTransport == "SEA"){
                        promiseArray.push(dbref.collection('ports').doc(order.portOfOrigin).get())
                        promiseArray.push(dbref.collection('ports').doc(order.destinationPort).get())
                        Promise.all(promiseArray).then(resultArray =>{
                            resultArray[0] = resultArray[0].data()
                            resultArray[1] = resultArray[1].data()
                            finalOrderArray.push({   
                                ...order,
                                originCountry : resultArray[0].country,
                                originPortName : resultArray[0].portName,
                                originState : resultArray[0].state,
                                destinationCountry : resultArray[1].country,
                                destinationPortName : resultArray[1].portName,
                                destinationState : resultArray[1].state
                            })
                            eachCallback();
                        }).catch(errArray =>{
                            eachCallback(errArray)
                        })
                    }else{
                        promiseArray.push(dbref.collection('airports').doc(order.airportOfOrigin).get())
                        promiseArray.push(dbref.collection('airports').doc(order.destinationAirport).get())
                        Promise.all(promiseArray).then(resultArray =>{
                            resultArray[0] = resultArray[0].data()
                            resultArray[1] = resultArray[1].data()
                            finalOrderArray.push({
                                ...order,
                                originAirportTag : resultArray[0].airportTag,
                                originAirportName : resultArray[0].airportName,
                                originState : resultArray[0].state,
                                originCountry : resultArray[0].country,
                                destinationAirportTag : resultArray[1].airportTag,
                                destinationAirportName : resultArray[1].airportName,
                                destinationState : resultArray[1].state,
                                destinationCountry : resultArray[1].country
                            })
                            eachCallback();
                        }).catch(errArray =>{
                            eachCallback(errArray)
                        })
                    }
                },(err) =>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(finalOrderArray)
                    }
                })
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