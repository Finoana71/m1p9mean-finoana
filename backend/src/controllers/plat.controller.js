const platServ = require("../services/plat.service")
const helper = require("../utils/helper");

const creer = async (req, res) =>{
    try{
        await platServ.creer(req);
        res.send(helper.makeDataApi(null));
    }
    catch(err){
        helper.gererErreur(err, res)
    }
}

module.exports = {
    creer
}