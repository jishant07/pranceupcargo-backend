var quoteModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();
var moment = require('moment')
var _ = require('underscore')

quoteModel.placeOnHold = (data) =>{
    data.body.status = "ACTIVE";
    data.body.deadline = moment().day(0 + 7).format("YYYY-MM-DD");
    data.body.uid = data.userInfo.uid
    return new Promise(async (resolve,reject) =>{
        data.body.quoteAmount = await getCost(data.body).catch(err =>{
            rejct(err)
        });
        dbref.collection('quotations').add({...data.body}).then(result =>{
            resolve(result.id)
        }).catch(err =>{
            console.log("ERROR PLACING QUOTE ON HOLD", err)
            reject(err)
        })
    })
}

const getCost = (body) =>{
    return new Promise(async (resolve, reject) =>{
        var costObject
        if(body.modeOfTransport == "SEA"){
            if(body.typeOfActivity == "Import"){
                costObject = await dbref.collection('ports').doc(body.portOfOrigin).get().catch(err =>{
                    reject(err)
                })
            }else{ 
                costObject = await dbref.collection('ports').doc(body.destinationPort).get()
                .catch(err =>{
                    reject(err)
                })
            }
        }else{
            if(body.typeOfActivity == "Import"){
                costObject = await dbref.collection('airports').doc(body.airportOfOrigin).get()
                .catch(err =>{
                    reject(err)
                })
            }else{
                costObject = await dbref.collection('airports').doc(body.destinationAirport).get()
                .catch(err =>{
                    reject(err)
                })
            }
        }
        costObject = costObject.data();
        var tobeUsedCost;
        if(body.deliveryType == "Normal"){
            tobeUsedCost = costObject.normal
        }else{
            tobeUsedCost = costObject.express
        }
        var pieceToCostArray = []
        body.pieces.forEach(piece =>{
            var tempCost = piece.length * piece.breath * piece.height * piece.noOfPieces
            if(piece.inchOrCm == "Inches"){
                if(piece.grossWeight > (tempCost / 366)){
                    if(piece.cargoType == "general"){
                        pieceToCostArray.push(piece.grossWeight * tobeUsedCost.gen)
                    }else{
                        pieceToCostArray.push(piece.grossWeight * tobeUsedCost.haz)
                    }
                }else{
                    if(piece.cargoType == "general"){
                        pieceToCostArray.push((tempCost / 366) * tobeUsedCost.gen)
                    }else{
                        pieceToCostArray.push((tempCost / 366) * tobeUsedCost.haz)
                    }
                }
            }else{
                if(piece.grossWeight > (tempCost / 6000)){
                    if(piece.cargoType == "general"){
                        pieceToCostArray.push(piece.grossWeight * tobeUsedCost.gen)
                    }else{
                        pieceToCostArray.push(piece.grossWeight * tobeUsedCost.haz)
                    }
                }else{
                    if(piece.cargoType == "general"){
                        pieceToCostArray.push((tempCost / 6000) * tobeUsedCost.gen)
                    }else{
                        pieceToCostArray.push((tempCost / 6000) * tobeUsedCost.haz)
                    }
                }
            }
        })
        resolve(pieceToCostArray.reduce((prev,current) =>  prev + current, 0))
    })
}

quoteModel.getAllQuotes = (data) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection("quotations").where("uid","==",data.uid)
        .get().then(snapshot =>{
            if(!snapshot.empty){
                var data = []
                snapshot.forEach(snap =>{
                    data.push({id:snap.id,data:snap.data()})
                })
                resolve(data)
            }else{
                resolve("No Quotes found")
            }
        }).catch(err =>{
            console.log("ERROR GETTING ALL QUOTATIONs", err)
            reject(err)
        })
    })
}

quoteModel.getQuotesbyId = (quoteId) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('quotations').doc(quoteId).get().then(result =>{
            if(result.exists){
                resolve(result.data())
            }else{
                reject("Quote no found")
            }
        }).catch(err =>{
            console.log("ERROR FETCHING QUOTE", err)
            reject(err)
        })
    })
}

module.exports = quoteModel