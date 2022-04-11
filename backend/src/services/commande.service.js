const db = require("../../configs/db").getDb();
const Commande = db.collection("commandes");
const userServ = require("./user.service");
const help = require("./../utils/helper");
const { ObjectId } = require("mongodb");

async function insertCommande(req){
    let commande = req.body;
    commande.status = "Nouvelle";
    commande.date = new Date();
    commande.idClient = req.currentUser._id;
    commande.client = req.currentUser.nom;
    await Commande.insert(commande);
}

async function getById(id){
    let commande = await Commande.findOne({_id: ObjectId(id)});
    return commande;
}

async function pretALivrer(id){
    let commande = await getById(id);
    if(commande.status != "Nouvelle")
        throw new Error("Cette commande ne peut pas être prêt à livrer");
    await Commande.update({_id: ObjectId(id)}, {$set:{status: "Pret a livrer"}});
}

async function attribuerLivreur(id, idLivreur){
    let commande = await getById(id);
    let livreur = await userServ.getALivreur(idLivreur);
    if(!livreur)
        throw new Error("Le livreur n'existe pas")
    if(commande.status != "Pret a livrer")
        throw new Error("Cette commande n'est pas encore prêt à livrer");
    await Commande.update({_id: ObjectId(id)}, {$set:{status: "Livraison", idLivreur: idLivreur, livreur: livreur.nom}});
}

async function livrer(id){
    let commande = await getById(id);
    if(commande.status != "Livraison")
        throw new Error("Cette commande n'est pas encore attribué a un livreur");
    await Commande.update({_id: ObjectId(id)}, {$set:{status: "Livre", dateLivraison: new Date()}});
}

async function getCommandeALivrer(idLivreur){
    let cond = {status: "Livraison"};
    cond.idLivreur = ObjectId(idLivreur).toString();
    // console.log("***********************")
    // console.log(cond)
    let commande = await Commande.find(cond).toArray();
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
        cond.idClient = ObjectId(user._id);
    else if(user.type == "Livreur")
        cond.idLivreur =  ObjectId(user._id);
    else if(user.type == "Restaurant")
        cond.idRestaurant =  user.idRestaurant;
        console.log(cond);
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