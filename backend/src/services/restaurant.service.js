const db = require("../../configs/db").getDb();
const Resto = db.collection("restaurants");

function genererRestaurant(req){
    let rep = {};
    rep.nom = req.body.nom;
    rep.adresse = req.body.adresse;
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
            res.send("OK")
        }
    )
}

async function getRestaurant(adresse, name){
    return await Resto.find({adresse: adresse, nom: name}).toArray();
}