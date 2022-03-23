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

module.exports = quoteModel