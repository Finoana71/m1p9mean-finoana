function makeDataApi(data, status = 200, message = ''){
    return {data, status, message}
}

function gererErreur(err, res){
    console.log(err);
    res.status(400).send({message: err.message})
}

module.exports = {
    makeDataApi,
    gererErreur
}