const db = require("../../configs/db").getDb();
const Commande = db.collection("commandes");
const ObjectID = db.ObjectID;
const userServ = require("./user.service");
const help = require("./../utils/helper")

async function insertCommande(req){
    let commande = req.body.commande;
    commande.status = "Nouvelle";
    commande.date = new Date();
    await Commande.insert(commande);
}

async function getById(id){
    let commande = await Commande.findOne({_id: ObjectID(id)});
    return commande;
}

async function pretALivrer(id){
    let commande = await getById(id);
    if(commande.status != "Nouvelle")
        throw new Error("Cette commande ne peut pas être prêt à livrer");
    await Commande.update({_id: ObjectID(id)}, {$set:{status: "Pret a livrer"}});
}

async function attribuerLivreur(id, idLivreur){
    let commande = await getById(id);
    let livreur = await userServ.getALivreur(idLivreur);
    if(!livreur)
        throw new Error("Le livreur n'existe pas")
    if(commande.status != "Pret a livrer")
        throw new Error("Cette commande n'est pas encore prêt à livrer");
    await Commande.update({_id: ObjectID(id)}, {$set:{status: "Livraison", idLivreur: idLivreur}});
}

async function livrer(id){
    let commande = await getById(id);
    if(commande.status != "Livraison")
        throw new Error("Cette commande n'est pas encore attribué a un livreur");
    await Commande.update({_id: ObjectID(id)}, {$set:{status: "Livre", dateLivraison: new Date()}});
}

async function getCommandeALivrer(idLivreur){
    let cond = {status: "Livraison"};
    cond.idLivreur = idLivreur;
    let commande = await Commande.find().toArray();
    return commande;
}

async function getCommandePretALivrer(){
    let cond = {status: "Pret a livrer"}
    return help.getCollectionPagine(cond, req, Commande);
}

async function getAllCommande(req){
    let cond = help.getConditionDateCommande(req);
    let user = req.currentUser;
    if(user.type == "Client")
        cond.idClient = user.id;
    else if(user.type == "Livreur")
        cond.idLivreur = user.id;
    else if(user.type == "Restaurant")
        cond.idRestaurant = user.idRestaurant;
    return help.getCollectionPagine(cond, req, Commande);
}

module.exports = {
    livrer,
    attribuerLivreur,
    getCommandeALivrer,
    insertCommande,
    pretALivrer,
    getById,
    getCommandeALivrer,
    getCommandePretALivrer,
    getAllCommande
}