const firebase = require("../database")
let appModel = {}
let dbref = firebase.firestore();

appModel.addCountry = (data) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('locations').add(data).then(result =>{
            resolve(result.id)
        }).catch(err =>{
            console.log("COUNTRY ADD ERROR", err)
            reject(err)
        })  
    })
}

appModel.addPortToCountry = (data) =>{
    return new Promise((resolve,reject) =>{
        if(data.placeId){
            dbref.collection('locations').doc(data.placeId)
            .collection('ports')
            .add(data)
            .then(result =>{
                resolve(result.id)
            }).catch(err =>{
                console.log("PORT ADD TO COUNTRY ERROR",err)
                reject(err)
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

appModel.addAirportToCountry = (data) =>{
    return new Promise((resolve,reject) =>{
        if(data.placeId){
            dbref.collection('locations').doc(data.placeId)
            .collection('airports')
            .add(data)
            .then(result =>{
                resolve(result.id)
            }).catch(err =>{
                console.log("PORT ADD TO COUNTRY ERROR",err)
                reject(err)
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

appModel.getPorts = (placeId) =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('locations')
        .doc(placeId).collection('ports')
        .get()
        .then(snapshot =>{
            let portList = []
            snapshot.forEach(snap =>{
                portList.push({id:snap.id,...snap.data()})
            })
            resolve(portList)
        }).catch(err =>{
            console.log("PORT FETCH ERROR", err)
            reject(err)
        })
    })
}

appModel.getAirports = (placeId) =>{
    return new Promise((resolve,reject)=>{
        dbref.collection('locations')
        .doc(placeId).collection('airports')
        .get()
        .then(snapshot =>{
            let airportList = []
            snapshot.forEach(snap =>{
                airportList.push({id:snap.id,...snap.data()})
            })
            resolve(airportList)
        }).catch(err =>{
            console.log("AIRPORT GET ERROR", err)
            reject(err)
        })
    })
}

appModel.listCountries = () =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('locations').get().then(snapshot =>{
            let countryList = []
            snapshot.forEach(snap =>{
                countryList.push({id:snap.id,...snap.data()})
            })
            resolve(countryList)
        }).catch(err =>{
            console.log("GETTING COUNTRIES ERROR",err)
            reject(err)
        })
    })
}

module.exports = appModel;