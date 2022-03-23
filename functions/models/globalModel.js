var globalModel = {}

globalModel.success = (data) =>{
    return {
        status:"success", 
        message:data
    }
}

globalModel.failure = (data) =>{
    return {
        status:"failure",
        message:data
    }
}


module.exports = globalModel