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
        dbref.collection('airports').where("country", "!=", "India").where("isActive","==",true).get().then(snapshot =>{
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
        dbref.collection('ports').where("country", "!=", "India").where("isActive","==",true).get().then(snapshot =>{
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
        dbref.collection("ports").where("country", "==", "India").where("isActive","==",true).get().then(snapshot =>{
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
        dbref.collection("airports").where("country", "==", "India").where("isActive","==",true).get().then(snapshot =>{
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

appModel.getAllPorts = () =>{
    return new Promise((resolve, reject) =>{
        dbref.collection('ports').get().then(snapshot =>{
            var portList = []
            snapshot.forEach(snap =>{
                portList.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            resolve(portList)
        }).catch(err =>{
            reject(err)
        })
    })
}

appModel.getAllAirports = () =>{
    return new Promise((resolve, reject) =>{
        dbref.collection('airports').get().then(snapshot =>{
            var airportList = []
            snapshot.forEach(snap =>{
                airportList.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            resolve(airportList)
        }).catch(err =>{
            reject(err)
        })
    })
}

appModel.editPort = (body) =>{
    return new Promise((resolve,reject) =>{
        var portId = body.portId
        delete body.portId
        dbref.collection("ports").doc(portId).set({...body},{merge:true}).then(result =>{
            resolve(result)
        }).catch(err =>{
            reject(err)
        })
    })
}

appModel.editAirport = (body) =>{
    return new Promise((resolve,reject) =>{
        var airportId = body.airportId
        delete body.airportId
        dbref.collection("airports").doc(airportId).set({...body},{merge : true}).then(result =>{
            resolve(result)
        }).catch(err =>{
            reject(err)
        })
    })
}

appModel.getUsers = () => {
    return new Promise((resolve, reject) =>{
        dbref.collection("users").where("isAdmin","!=", true).get()
        .then(snapshot =>{
            if(!snapshot.empty){
                var userList = []
                snapshot.forEach(snap =>{
                    userList.push({
                        id: snap.id,
                        ...snap.data()
                    })
                })
                resolve(userList)
            }else{
                reject("No Users Found")
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

appModel.editUser = (body) =>{
    return new Promise((resolve, reject) =>{
        var userId = body.userId
        delete body.userId
        dbref.collection('users').doc(userId).set({...body},{merge:true}).then(result =>{
            resolve(result)
        }).catch(err =>{
            reject(err)
        })
    })
}

module.exports = appModel;