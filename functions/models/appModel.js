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
        dbref.collection('airports').where("country", "!=", "India").get().then(snapshot =>{
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
        dbref.collection('ports').where("country", "!=", "India").get().then(snapshot =>{
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

appModel.getPortById = (data) =>{
    return new Promise((resolve,reject) =>{
        if(data.portId){
            dbref.collection("ports").doc(data.portId).get().then(snap =>{
                resolve({...snap.data()})
            }).catch(err =>{
                console.log("DB ERR IN GETTING PORT BY ID", err)
                reject(err)
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

appModel.getAirportById = (data) =>{
    return new Promise((resolve,reject) =>{
        if(data.airportId){
            dbref.collection("airports").doc(data.airportId).get().then(snap =>{
                resolve({...snap.data()})
            }).catch(err =>{
                console.log("DB ERR IN GETTING AIRPORT BY ID", err)
                reject(err)
            })
        }else{
            reject("Incomplete Request")
        }
    })
}

appModel.getIndianPorts = () =>{
    return new Promise((resolve,reject) =>{
        dbref.collection("ports").where("country", "==", "India").get().then(snapshot =>{
            if(snapshot.empty){
                reject("No Indian Ports Found")
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
            console.log("ERROR IN GETTING INDIAN PORTs" , err)
        })
    })
}

appModel.getIndianAirports = () =>{
    return new Promise((resolve,reject) =>{
        dbref.collection("airports").where("country", "==", "India").get().then(snapshot =>{
            if(snapshot.empty){
                reject("No Indian AirPOrts Found")
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
            console.log("ERROR IN GETTING INDIAN AIRPORTs" , err)
        })
    })
}

module.exports = appModel;