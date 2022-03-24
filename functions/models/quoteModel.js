var quoteModel = {}
var firebase = require('../database')
var dbref = firebase.firestore();
var moment = require('moment')

quoteModel.placeOnHold = (data) =>{
    data.body.status = "HOLD";
    data.body.deadline = moment().day(0 + 7);
    data.body.quoteAmount = "DUMMY";
    data.body.uid = data.userInfo.uid
    return new Promise((resolve,reject) =>{
        dbref.collection('quotations').add({...data.body}).then(result =>{
            resolve(result.id)
        }).catch(err =>{
            console.log("ERROR PLACING QUOTE ON HOLD", err)
            reject(err)
        })
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