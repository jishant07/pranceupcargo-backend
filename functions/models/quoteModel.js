var quoteModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();
var moment = require('moment')

quoteModel.placeOnHold = (data) =>{
    data.status = "HOLD";
    data.deadline = moment().day(0 + 7);
    data.quoteAmount = "DUMMY";
    return new Promise((resolve,reject) =>{
        dbref.collection('quotations').add({...data}).then(result =>{
            resolve(result)
        }).catch(err =>{
            console.log("ERROR PLACING QUOTE ON HOLD", err)
            reject(err)
        })
    })
}

quoteModel.getAllQuotes = () =>{
    return new Promise((resolve,reject) =>{
        dbref.collection("quotations").get().then(snapshot =>{
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
        })
    })
}

quoteModel.getQuotesbyId = (quoteId) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('quotations').doc(quoteId).get().then(result =>{
            if(result.exists){
                resolve(result)
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