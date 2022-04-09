const db = require("../../configs/db").getDb();
const Plat = db.collection("plats");
const ObjectID = db.ObjectID;
const help = require("./../utils/helper")

async function creer(req){
    validerPlat(req);
    await verifierPlatExistant(req);
    let plat = genererPlat(req);
    await Plat.insert(plat).then((data)=>{
        insertImagePlat(req);
    });
}

function insertImagePlat(req){
    if(req.body.imageFile)
        return;
    let path = __basedir + "/assets/images/plat/" + req.body.image;
    help.uploadFile(req.body.imageFile, path)
}

function validerPlat(req){
    if(!req.body.prixAchat)
        throw new Error("Veuillez renseigner le prix d'achat")
    if(!req.body.prixVente)
        throw new Error("Veuillez renseigner le prix de vente")           
    if(!req.body.nom)
        throw new Error("Veuillez renseigner le nom du plat")           
    if(!req.body.description)
        throw new Error("Veuillez renseigner la description du plat")           
}

function genererPlat(req){
    let plat = {
        prixAchat: req.body.prixAchat,
        prixVente: req.body.prixAchat,
        nom: req.body.prixAchat,
        description: req.body.prixAchat,
        idRestaurant: req.currentUser.idRestaurant
    }
    return plat;
}

async function verifierPlatExistant(req){
    let plats = await getPlatRestaurantByNom(req.body.nom, req.currentUser.idRestaurant);
    if(plats.length != 0)
        throw new Error("Ce plat existe deja dans le restaurant");
}

async function getPlatRestaurantByNom(nom, idRestaurant){
    let cond = {nom: nom, idRestaurant: idRestaurant};
    return await Plat.find(cond).toArray();
}

async function findOne(id){
    let plat = await Plat.findOne({_id: ObjectID(id)});
    return plat;
}


module.exports = {
    creer   
}