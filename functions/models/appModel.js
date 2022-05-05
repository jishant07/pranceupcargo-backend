const firebase = require("../database")
let appModel = {}
let dbref = firebase.firestore();

appModel.addAirport = (body) =>{
    return new Promise((resolve, reject) =>{
        dbref.collection('airports').add({...body}).then(result =>{
            resolve(result.id)
        }).catch(err =>{
            console.log("ADDING AIRPORT ERR", err)
            reject(err)
        })
    })
}

appModel.addPort = (body) => {
    return new Promise((resolve, reject) =>{
        dbref.collection('ports').add({...body}).then(result =>{
            resolve(result.id)
        }).catch(err =>{
            console.log("ADDING PORT ERR ", err)
            reject(err)
        })
    })
}

appModel.listAirports = () =>{
    return new Promise((resolve,reject) =>{
        dbref.collection('airports').get().then(snapshot =>{
            if(snapshot.empty){
                reject("No Airports Found")
            }else{
                var airportList = []
                snapshot.forEach(snap =>{
                    airportList.push({
                        id : snap.id,
                        ...snap.data()
                    })
                })
                resolve(airportList)
            }
        }).catch(err =>{
            console.log("LISTING AIRPORTS ERR ", err)
            reject(err)
        })
    })
}

appModel.listPorts = () =>{
    return new Promise((resolve,reject)=>{
        dbref.collection('ports').get().then(snapshot =>{
            if(snapshot.empty){
                reject("No Ports Found")
            }else{
                var portList = []
                snapshot.forEach(snap =>{
                    portList.push({
                        id : snap.id,
                        ...snap.data()
                    })
                })
                resolve(portList)
            }
        }).catch(err =>{
            console.log("LISTING PORTS ERR", err)
            reject(err)
        })
    })
}

module.exports = appModel;