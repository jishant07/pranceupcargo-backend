var priceModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();

priceModel.addPriceToPort = (data) =>{
    let tempCostObj = {
        hazCost : {
            normal : data.hazNormal,
            express : data.hazExpress
        },
        genCost : {
            normal : data.genNormal,
            express : data.genExpress
        }
    }
    return new Promise((resolve,reject) =>{
        if(data.portId){
            dbref.collection("ports").doc(data.portId).set(tempCostObj,{merge : true}).then(result =>{
                resolve(result)
            }).catch(err =>{
                console.log("ADDING COST TO PORT ERR", err)
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

priceModel.addPriceToAirport = (data) =>{
    let tempCostObj = {
        hazCost : {
            normal : data.hazNormal,
            express : data.hazExpress
        },
        genCost : {
            normal : data.genNormal,
            express : data.genExpress
        }
    }
    return new Promise((resolve,reject) =>{
        if(data.airportId){
            dbref.collection('airports').doc(data.airportId).set(tempCostObj,{merge : true}).then(result =>{
                resolve(result)
            }).catch(err =>{
                console.log("ADDING PRICE ERR", err)
                reject(err)
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

module.exports = priceModel