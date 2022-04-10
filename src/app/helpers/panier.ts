function genererPanier(){
    let panier = {
        // idRestaurant: idRestaurant,
        plats: [],
        prixAchat: 0,
        prixVente: 0
    };
    return panier;
}

export function getPanier(){
    let panier = JSON.parse(localStorage.getItem("panier"));
    if(!panier){
        panier = genererPanier()
        localStorage.setItem("panier", JSON.stringify(panier))
    }
    return panier;
}

function genererPlatPanier(plat){
    let rep:any = {};
    rep.nom = plat.nom;
    rep.prixAchat = plat.prixAchat;
    rep.priVente = plat.priVente;
    rep.image = plat.image;
    rep.quantite = 1;
    return rep;
}

function  ajouterPlatPanier(plat, panier){
    let platAjout = genererPlatPanier(plat);
    let plats = panier.plats;
    let ind = 0;
    for(let i = 0; i < plats.length; i++){
        if(plats[i].nom == platAjout.nom){
            plats[i].quantite++;
            ind++;
            break;
        }
    }
    if(ind == 0)
        plats.push(platAjout)
}

export function ajoutPanier(plat){
    let panier = getPanier();
    if(panier.plats.length != 0 && plat.idRestaurant != panier.idRestaurant){
        alert("Vous avez changé de restaurant, les plats de l'ancien seront supprimés")
        panier.plats.splice(0, panier.plats.length);    
    }
    panier.idRestaurant = plat.idRestaurant;
    ajouterPlatPanier(plat, panier);
    localStorage.setItem("panier", JSON.stringify(panier))
}
