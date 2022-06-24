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

globalModel.randomFileNameGen = (length = 5) =>{
    const genStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let randomString = "";
    for (let i=0; i<length; i++) {
        const randNum = Math.floor(Math.random() * (genStr.length - 0 + 1));
        randomString += genStr[randNum];
    }
    return randomString;
}


module.exports = globalModel