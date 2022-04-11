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

// Avec pagination
const getAllRestaurant = async (req, res) =>{
    try{
        let resto = await restaurant.getAllRestaurant(req);
        res.send(helper.makeDataApi(resto, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

const getAll = async (req, res) =>{
    try{
        let resto = await restaurant.getAll(req);
        res.send(helper.makeDataApi(resto, 200, ""));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}


const getById = async (req, res) =>{
    try{
        let resto = await restaurant.getRestaurantById(req.params.id);
        if(!resto)
            throw new Error("Ce restaurant n'existe pas")
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


const getPlatsRestaurant = async (req, res) =>{
    try{
        let idResto;
        if(req.params.id)
            idResto = req.params.id
        else if(req.currentUser&&req.currentUser.idRestaurant)
            idResto = req.currentUser.idRestaurant;
        if(!idResto)
            throw new Erreur("Il y a une erreur")
        let plats = await restaurant.getPlatRestaurant(idResto, req);
        res.send(helper.makeDataApi(plats, 200, ""));
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
    getAllRestaurant,
    getPlatsRestaurant,
    getById
}