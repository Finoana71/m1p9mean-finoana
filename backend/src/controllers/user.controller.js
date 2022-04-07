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

const activer = async (req, res) =>{
    try{
        let token = req.query.token;
        await userServ.activerToken(token);
        res.send("Votre compte est activé")
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
    }
}

const nouveau = async (req, res) =>{
    try{
        // let token = req.query.token;
        await userServ.nouveau(req);
        res.send(helper.makeDataApi(null, 200, "Utilisateur enregistré avec succès"));
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: err.message})
    }
}

module.exports = {
    inscription,
    connexion,
    activer,
    nouveau
}