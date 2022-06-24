var cron = require('node-cron')
var dbref = require("../database").firestore()
var moment = require('moment')
var async = require('async')

var runcron = true;

if(runcron){
    cron.schedule("0 0 * * 7",()=>{
        setQuoteInvalid();
    },{
        timezone:"Asia/Kolkata",
        scheduled:true
    })   
}

var setQuoteInvalid = () =>{
    var quoteList = []
    dbref.collection('quotations').get().then(snapshot =>{
        //Getting All Quotation Data.
        snapshot.forEach(snap =>{
            quoteList.push({
                id : snap.id,
                ...snap.data()
            })
        })

        //Setting passed Quotes as Invalid.
        async.eachSeries(quoteList, (quote,eachcallback)=>{
            var start = moment(quote.deadline)
            var end = moment(new Date())
            if(moment.duration(start.diff(end)).asDays() <= 0){
                dbref.collection('quotations').doc(quote.id).update(
                    {status : "EXPIRED"}
                ).then(updateResult =>{
                    eachcallback();
                }).catch(err =>{
                    eachcallback(err)
                })
            }
        },(err =>{
            if(err){
                console.log("CRON RUN ERROR", err)
            }else{
                console.log("CRON RUN SUCCESSFUL!")
            }
        }))
    })
}
