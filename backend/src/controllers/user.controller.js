const userServ = require("../services/user.service")
const helper = require("../utils/helper");

const inscription = async (req, res) =>{
    try{
        let client = await userServ.inscrire(req);
        res.send(helper.makeDataApi(client));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}


const connexion = async (req, res) =>{
    try{
        let client = await userServ.login(req);
        res.send(helper.makeDataApi(client));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const activer = async (req, res) =>{
    try{
        let token = req.query.token;
        await userServ.activerToken(token);
        res.send("Votre compte est activé")
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const nouveau = async (req, res) =>{
    try{
        // let token = req.query.token;
        await userServ.nouveau(req);
        res.send(helper.makeDataApi(null, 200, "Utilisateur enregistré avec succès"));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

module.exports = {
    inscription,
    connexion,
    activer,
    nouveau
}