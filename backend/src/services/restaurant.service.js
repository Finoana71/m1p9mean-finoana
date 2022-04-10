const db = require("../../configs/db").getDb();
const ISODate = db.ISODate;
const Resto = db.collection("restaurants");
const Plat = db.collection("plats");
const Commande = db.collection("commandes");
const help = require("./../utils/helper")

function genererRestaurant(req){
    let rep = {};
    rep.nom = req.body.nom;
    rep.adresse = req.body.adresse;
    rep.image = req.body.image;
    return rep;
}

function validerNom(req){
    if(!req.body.nom)
        throw new Error("Veuillez renseigner le nom du restaurant")
    if(!req.body.adresse)
        throw new Error("Veuillez renseigner l'adresse du restaurant")           
}

async function inserer(req, res){
    validerNom(req);
    let resto = genererRestaurant(req);
    let restoMemeAdresse = await getRestaurant(resto.adresse, resto.nom);
    if(restoMemeAdresse.length != 0) throw new Error("Ce restaurant existe déja");
    Resto.insert(resto).then(
        (data) => {
            insertImageRestaurant(req)
            res.send(help.makeDataApi(null, 200, "OK"))
        }
    )
}

// async function update(req, res){
//     validerNom(req);
//     let id = req.params.id;
//     let resto = genererRestaurant(req);
//     let restoMemeAdresse = await getRestaurant(resto.adresse, resto.nom);
//     if(restoMemeAdresse.length != 0) throw new Error("Ce restaurant existe déja");
//     Resto.insert(resto).then(
//         (data) => {
//             insertImageRestaurant(req)
//             res.send("OK")
//         }
//     )
// }

function insertImageRestaurant(req){
    if(!req.body.imageFile)
        return;
    let path = __dirname + "/../../public/images/restaurants/" + req.body.image;
    help.uploadFile(req.body.imageFile, path)
}

async function getRestaurant(adresse, name){
    return await Resto.find({adresse: adresse, nom: name}).toArray();
}

async function getAllRestaurant(req){
    let cond = help.genererConditionSearch(req);
    return help.getCollectionPagine(cond, req, Resto)
}

async function getAll(){
    return await Resto.find().toArray();
}

async function getPlatRestaurant(idResto, req){
    let cond = help.genererConditionSearch(req);
    cond.idRestaurant = idResto;
    return help.getCollectionPagine(cond, req, Plat);
}

async function getCommandeRestaurant(idResto, req){
    let cond = help.genererConditionSearch(req);
    cond.idRestaurant = idResto;
    return help.getCollectionPagine(cond, req, Commande);
}

async function getBenefice(idResto, req, avecResto = true){
    let cond = help.getConditionDateCommande(req);
    cond.status = "Livre";
    if(avecResto)
    cond.idRestaurant = idResto
    return await Commande.aggregate([
        { $match: cond },
        { $group:
            { 
                prixVente : { $sum: "$prixVente" },
                prixAchat : { $sum: "$prixAchat" },
                prixLivraison : { $sum: "$prixLivraison" }
            }
        }
    ]);
}


module.exports = {
    getAllRestaurant,
    getPlatRestaurant,
    inserer,
    getCommandeRestaurant,
    getBenefice,
    getAll
}