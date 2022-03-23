var priceModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();

priceModel.addPriceToPort = (data) =>{
    return new Promise((resolve,reject) =>{
        if(data.placeId && data.portId){
            dbref.collection('locations').doc(data.placeId)
            .collection('ports').doc(data.portId).set({normal:data.normal,express:data.express},{merge:true}).then(result =>{
                resolve("Price added to the Port")
            }).catch(err =>{
                console.log("ERROR ADDING PRICE TO THE PORT",err)
                reject("Price Adding Error")
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

priceModel.addPriceToAirport = (data) =>{
    return new Promise((resolve,reject) =>{
        if(data.placeId && data.airportId){
            dbref.collection('locations').doc(data.placeId)
            .collection('airports').doc(data.airportId).set({normal:data.normal,express:data.express},{merge:true}).then(result =>{
                resolve("Price added to the Airport")
            }).catch(err =>{
                console.log("ERROR ADDING PRICE TO THE AIRPORT",err)
                reject("Price Adding Error")
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

module.exports = priceModel