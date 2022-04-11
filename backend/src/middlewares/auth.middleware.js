const jwt = require("jsonwebtoken");
const dbo = require('../../configs/db')
const db = dbo.getDb();
const User = db.collection("utilisateurs");
var mongo = require("mongodb")
const ObjectId = mongo.ObjectID;

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send({
            message: "Aucun token",
        });
    }

    const bearer = token.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, "ekalySecret", async (err, decoded) => {
        if (!decoded) {
            return res.status(401).send({
                message: "Non autorisé!",
            });
        }
        req.userId = decoded.userId;
        req.currentUser = await User.findOne({_id: ObjectId(decoded.id)});
        console.log(req.currentUser)
        if (!req.currentUser||err) {
            return res.status(401).send({
                message: "Non autorisé!",
            });
        }
        next();
    });
};

const isAdmin = (req, res, next) => {
    let data = req.currentUser;
    if(!data||data.type != 'Ekaly'){
        res.status(403).send({message: "Non autorisé"})
        return;
    }
    next();
}

const isRestaurant = (req, res, next) => {
    let data = req.currentUser;
    if(!data||data.type != 'Restaurant'){
        res.status(403).send({message: "Non autorisé"})
        return;
    }
    next();
}

const isLivreur = (req, res, next) => {
    let data = req.currentUser;
    if(!data||data.type != 'Livreur'){
        res.status(403).send({message: "Non autorisé"})
        return;
    }
    next();
}

const isClient = (req, res, next) => {
    let data = req.currentUser;
    if(!data||data.type != 'Client'){
        res.status(403).send({message: "Non autorisé"})
        return;
    }
    next();
}
module.exports = {
    isAdmin,
    verifyToken,
    isRestaurant,
    isClient,
    isLivreur
}