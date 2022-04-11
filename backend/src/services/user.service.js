const dbo = require('../../configs/db');
const db = dbo.getDb();
const User = db.collection("utilisateurs");
const TokenActivation = db.collection("tokenActivations");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let Handlebars = require("handlebars");
let fs = require("fs");
const emailService = require("./mail.service")
var path = require('path');
const help = require("./../utils/helper");
const { ObjectId } = require('mongodb');

const baseUrl = require("../../configs/environment").baseUrl;
const ObjectID = db.ObjectID;


async function envoyerLienActivation(email, token){
    let subject = "Lien d'activation de compte E-Kaly";
    let source =  fs.readFileSync(path.join(__dirname,"activation.html"), "utf8");
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
    await User.insert(client, {fullResult: true}).then(async(data) => {
        let token = bcrypt.hashSync(client.nom, 8);
        console.log(data);
        TokenActivation.insert({token: token, userId: data.insertedIds["0"]})
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
    var token = jwt.sign({id: users[0]._id}, 'ekalySecret', {expiresIn: '2h'});
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

function verifierType(req){
    if(!req.body.type)
        throw new Error("Veuillez spécifier le type de l'utilisateur");
    if(req.body.type!='Ekaly'&&req.body.type!='Restaurant'&&req.body.type!='Livreur')
        throw new Error("Type de l'utilisateur non valide");
    if(!req.body.idRestaurant&&req.body.type=='Restaurant')
        throw new Error("Veuillez spécifier le restaurant");
}

function genererUtilisateur(req){
    let client = {};
    verifierType(req);
    client.email = req.body.email;
    client.nom = req.body.nom;
    client.motDePasse = bcrypt.hashSync(req.body.motDePasse, 8);
    client.type = req.body.type;
    if(req.body.type == 'Restaurant')
    client.idRestaurant = req.body.idRestaurant;
    client.active = true;
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

async function activerToken(token){
    let tokenActivation = await TokenActivation.findOne({token: token});
    if(!tokenActivation) throw new Error("Le lien n'est pas valide")
    let user = await User.findOne({_id: tokenActivation.userId});
    if(user.active) throw new Error("Le lien n'est pas valide")
    await User.update({_id: tokenActivation.userId}, {$set: {active: true}}).then(
        (data) => {
            TokenActivation.remove({token: token});
        }
    );
}

// Nouveau
async function nouveau(req){
    validerRequeteInscription(req.body);
    let users = await getUtilisateurByEmail(req.body.email);
    if(users.length != 0)
        throw new Error("Cet email est deja utilisé")
    let user = genererUtilisateur(req);
    user.valide = true;
    await User.insert(user);
}

// Livreur
async function getAllLivreurs(){
    console.log(__dirname + "/../../public/images/restaurant/")
    let livreurs = await User.find({type: "Livreur"}).toArray();
    return livreurs;
}

// Livreur findOne
async function getALivreur(id){
    let livreur = await User.findOne({type: "Livreur", _id: ObjectId(id)});
    return livreur;
}

// Tous les utilisateurs
async function getAllUtilisateurs(req){
    let cond = help.genererConditionSearch(req);
    return help.getCollectionPagine(cond, req, User);
}

async function getById(id){
    let client = await User.findOne({_id: ObjectId(id)});
    return client;
}

module.exports = {
    inscrire,
    login,
    activerToken,
    nouveau,
    getALivreur,
    getAllLivreurs,
    getAllUtilisateurs,
    getById
}