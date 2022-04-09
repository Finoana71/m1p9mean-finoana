const restaurant = require("../services/restaurant.service")
const helper = require("../utils/helper");

const insert = async (req, res) =>{
    try{
        await restaurant.inserer(req, res);
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getAll = async (req, res) =>{
    try{
        let resto = await restaurant.getAllRestaurant(req);
        res.send(helper.makeDataApi(resto, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getCommandeRestaurant = async (req, res) =>{
    try{
        let idResto = req.currentUser.idRestaurant;
        let resto = await restaurant.getCommandeRestaurant(idResto, req);
        res.send(helper.makeDataApi(resto, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getBeneficeResto = async (req, res) =>{
    try{
        let idResto = req.currentUser.idRestaurant;
        let benefice = await restaurant.getBenefice(idResto, req);
        res.send(helper.makeDataApi(benefice, 200, ""));
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

module.exports = {
    insert,
    getAll,
    getCommandeRestaurant,
    getBeneficeResto,
    getBenefice
}