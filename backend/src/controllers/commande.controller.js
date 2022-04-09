const comServ = require("../services/commande.service")
const restaurant = require("../services/restaurant.service")
const helper = require("../utils/helper");

const creer = async (req, res) =>{
    try{
        await comServ.insertCommande(req);
        res.send(helper.makeDataApi(null));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const pretALivrer = async (req, res) =>{
    try{
        let idCommande = req.params.id;
        await comServ.pretALivrer(idCommande)
        res.send(helper.makeDataApi(null));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const attribuerLivreur = async (req, res) =>{
    try{
        let idLivreur = req.query.idLivreur;
        let idCommande = req.params.id;
        await comServ.attribuerLivreur(idCommande, idLivreur)
        res.send(helper.makeDataApi(null));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const livrer = async (req, res) =>{
    try{
        let idCommande = req.params.id;
        await comServ.livrer(idCommande)
        res.send(helper.makeDataApi(null));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getBenefice = async (req, res) =>{
    try{
        let benefice = await restaurant.getBenefice(null, req, false);
        res.send(helper.makeDataApi(benefice, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getCommandeALivrer = async (req, res) =>{
    try{
        let idLivreur = req.currentUser.id;
        let com = await comServ.getCommandeALivrer(idLivreur);
        res.send(helper.makeDataApi(com, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getCommande = async (req, res) =>{
    try{
        let id = req.params.id;
        let com = await comServ.getById(id)
        res.send(helper.makeDataApi(com, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}


const getAllCommande = async (req, res) =>{
    try{
        let com = await comServ.getAllCommande(req)
        res.send(helper.makeDataApi(com, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

module.exports = {
    creer,
    livrer,
    attribuerLivreur,
    pretALivrer,
    getBenefice,
    getCommandeALivrer,
    getCommande,
    getAllCommande
}