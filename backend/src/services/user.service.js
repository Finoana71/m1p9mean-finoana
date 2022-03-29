const dbo = require('../../configs/db');
const db = dbo.getDb();
const User = db.collection("utilisateurs");
const bcrypt = require("bcrypt");

async function inscrire(req){
    // console.log(req.body)
    validerRequeteInscription(req.body);
    await verifierMailUtilise(req.body.email);
    let client = genererClientReq(req);
    await User.insert(client).then((data, d) => {
        console.log(data)
        console.log("--------------------------------")
        console.log(d)
    });
    return client;
}

async function login(req){
    validerRequeteLogin(req.body);
    let users = await getUtilisateurByEmail(req.body.email);
    if(users.length == 0)
        throw new Error("Cet email n'est pas inscrit")
    if(users[0].valide == false)
        throw new Error("Cette compte n'est pas encore activé")
    if(!bcrypt.compareSync(req.body.motDePasse, users[0].motDePasse))
        throw new Error("Le mot de passe est incorrect")
    return users[0];
}

function validerRequeteLogin(req){
    // console.log(req);
    if(!req.email||!req.motDePasse)
        throw new Error("Il y a un ou plusieurs champs vides");
}

function validerRequeteInscription(req){
    // console.log(req);
    if(!req.email||!req.motDePasse||!req.nom)
        throw new Error("Il y a un ou plusieurs champs vides");
}

function genererClientReq(req){
    let client = {};
    client.email = req.body.email;
    client.nom = req.body.nom;
    client.motDePasse = bcrypt.hashSync(req.body.motDePasse, 8);
    client.type = "Client";
    client.active = false;
    return client;
}

async function verifierMailUtilise(email){
    let users = await getUtilisateurByEmail(email);
    console.log(users);
    if(users.length != 0) throw new Error("Cet email est deja utilisé par un autre utilisateur")
}

async function getUtilisateurByEmail(email){
    let users = await User.find({email: email}).toArray();
    return users;
}


module.exports = {
    inscrire,
    login
}