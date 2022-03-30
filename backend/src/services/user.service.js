const dbo = require('../../configs/db');
const db = dbo.getDb();
const User = db.collection("utilisateurs");
const TokenActivation = db.collection("tokenActivations");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let Handlebars = require("handlebars");
let fs = require("fs");
const emailService = require("./mail.service")

const baseUrl = require("../../configs/environment").baseUrl;



async function envoyerLienActivation(email, token){
    let subject = "Lien d'activation de compte E-Kaly";
    let source =  fs.readFileSync("views/activation.html", "utf8");
    let template = Handlebars.compile(source);
    let url = baseUrl + "/activerClient?token=" + token;
    let htmlContent = template({ lien: url});
    await emailService.sendEmail(email, subject, htmlContent);
}


// Inscription
async function inscrire(req){
    // console.log(req.body)
    validerRequeteInscription(req.body);
    await verifierMailUtilise(req.body.email);
    let client = genererClientReq(req);
    await User.insert(client).then(async(data) => {
        let token = bcrypt.hashSync(client.nom, 8);
        // TokenActivation.insert({token: token})
        await envoyerLienActivation(client.email, token);
    });
    return client;
}

// Tester le mot de passe et si l'utilisateur est deja validé
function testLogin(motDePasse, user){
    if(user.valide == false)
        throw new Error("Cette compte n'est pas encore activé")
    if(!bcrypt.compareSync(motDePasse, user.motDePasse))
        throw new Error("Le mot de passe est incorrect");
    
}

// Se connecter
async function login(req){
    validerRequeteLogin(req.body);
    let users = await getUtilisateurByEmail(req.body.email);
    if(users.length == 0)
        throw new Error("Cet email n'est pas inscrit")
    testLogin(req.body.motDePasse, users[0]);
    var token = jwt.sign({userID: users[0].id}, 'ekalySecret', {expiresIn: '2h'});
    users[0].token = token;
    return users[0];
}

// Verifier requete login
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