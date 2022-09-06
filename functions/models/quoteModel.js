var quoteModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();
var moment = require('moment')
var _ = require('underscore')
var async = require('async')

quoteModel.placeOnHold = (data) =>{
    data.body.status = "ACTIVE";
    data.body.deadline = moment().day(0 + 7).format("YYYY-MM-DD");
    data.body.uid = data.userInfo.uid
    return new Promise(async (resolve,reject) =>{
        quoteObject = await quoteModel.getCost(data.body).catch(err =>{
            rejct(err)
        });
        dbref.collection('quotations').add({
            ...data.body, 
            quoteCostUsed : quoteObject.tobeUsedCost, 
            quoteAmount : quoteObject.calculatedCost
        }).then(result =>{
            resolve(result.id)
        }).catch(err =>{
            console.log("ERROR PLACING QUOTE ON HOLD", err)
            reject(err)
        })
    })
}

quoteModel.getCost = (body) =>{
    return new Promise(async (resolve, reject) =>{
        var costObject;
        var tobeUsedCost;
        if(body.quoteType && body.quoteType == "ORDINARY"){
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
            if(body.deliveryType == "Normal"){
                tobeUsedCost = costObject.normal
            }else{
                tobeUsedCost = costObject.express
            }
        }else if(body.quoteType && body.quoteType == "SPECIAL" && body.tobeUsedCost){
            tobeUsedCost = body.tobeUsedCost
        }else{
            reject("Cost Calculation Error")
        }
        var pieceToCostArray = []
        // TODO: Fix Gen / Haz Costing for dynamic types 
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
        resolve({
            calculatedCost : pieceToCostArray.reduce((prev,current) =>  prev + current, 0),
            tobeUsedCost
        })
    })
}

quoteModel.getAllQuotes = (quoteState,data) =>{
    return new Promise((resolve,reject) =>{
        let quotePromise;
        if(quoteState && quoteState == "ACTIVE")
        {
            quotePromise = dbref.collection("quotations").where("uid","==", data.uid).where("status","==", "ACTIVE").get()

        }else if(quoteState && quoteState == "EXPIRED"){
            
            quotePromise = dbref.collection("quotations").where("uid","==", data.uid).where("status","==", "EXPIRED").get()
        }
        quotePromise.then(snapshot =>{
            if(!snapshot.empty){
                var data = []
                snapshot.forEach(snap =>{
                    data.push({...snap.data(), id:snap.id})
                })
                var finalQuoteArray = []
                var promiseArray = []
                async.eachSeries(data, (eachQuote, eachCallback)=>{
                    promiseArray = []
                    if(eachQuote.modeOfTransport == "SEA"){
                        promiseArray.push(dbref.collection('ports').doc(eachQuote.portOfOrigin).get())
                        promiseArray.push(dbref.collection('ports').doc(eachQuote.destinationPort).get())
                        Promise.all(promiseArray).then(resultArray =>{
                            resultArray[0] = resultArray[0].data()
                            resultArray[1] = resultArray[1].data()
                            finalQuoteArray.push({   
                                ...eachQuote,
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
                        promiseArray.push(dbref.collection('airports').doc(eachQuote.airportOfOrigin).get())
                        promiseArray.push(dbref.collection('airports').doc(eachQuote.destinationAirport).get())
                        Promise.all(promiseArray).then(resultArray =>{
                            resultArray[0] = resultArray[0].data()
                            resultArray[1] = resultArray[1].data()
                            finalQuoteArray.push({
                                ...eachQuote,
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
                        resolve(finalQuoteArray)
                    }
                })
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