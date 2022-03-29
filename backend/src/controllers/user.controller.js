const userServ = require("../services/user.service")
const helper = require("../utils/helper");

const inscription = async (req, res) =>{
    try{
        let client = await userServ.inscrire(req);
        res.send(helper.makeDataApi(client));
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
    }
}


const connexion = async (req, res) =>{
    try{
        let client = await userServ.login(req);
        res.send(helper.makeDataApi(client));
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
    }
}

module.exports = {
    inscription,
    connexion
}