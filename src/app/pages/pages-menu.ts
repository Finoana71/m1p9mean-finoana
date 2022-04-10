import { NbMenuItem } from '@nebular/theme';

export function getUser(){
  return JSON.parse(localStorage.getItem("user"))
}

export function isDeconnecte(){
  let user = getUser();
  let rep = !user;
  console.log("isConnecte", rep)
  return rep;
}
export function isEkaly(){
  let user = getUser();
  return user && user.type === "Ekaly";
}

export function isRestaurant(){
  let user = getUser();
  return user && user.type === "Restaurant";
}

export function isClient(){
  let user = getUser();
  return user && user.type === "Client";
}


export function isLivreur(){
  let user = getUser();
  return user && user.type === "Livreur";
}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Restaurant',
    icon: 'shopping-cart-outline',
    link: '/pages/restaurants',
    home: true,
    hidden: isLivreur() || isRestaurant()
  },
  {
    title: 'Plat à livrer',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
    hidden: !isLivreur()
  },
  {
    title: 'Gestion plats',
    icon: 'shopping-cart-outline',
    link: '/pages/plats',
    home: true,
    hidden: !isRestaurant()
  },
  {
    title: 'Gestion utilisateurs',
    icon: 'people-outline',
    link: '/pages/utilisateurs',
    home: true,
    hidden: !isEkaly()
  },
  {
    title: 'Gestion livraison',
    icon: 'car-outline',
    link: '/pages/dashboard',
    home: true,
    hidden: !isEkaly()
  },
  {
    title: 'Gestion commande',
    icon: 'shopping-bag-outline',
    link: '/pages/dashboard',
    home: true,
    hidden: !isRestaurant()
  },
  {
    title: 'Benefice par restaurant',
    icon: 'checkmark-circle-outline',
    link: '/pages/dashboard',
    home: true,
    hidden: !isEkaly()
  },
  {
    title: 'Benefice',
    icon: 'checkmark-circle-outline',
    link: '/pages/dashboard',
    home: true,
    hidden: !isRestaurant()
  },
];
