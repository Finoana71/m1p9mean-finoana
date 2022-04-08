import { NbMenuItem } from '@nebular/theme';

function getUser(){
  return JSON.parse(localStorage.getItem("user"))
}

function isEkaly(){
  let user = getUser();
  return user && user.type === "Ekaly";
}

function isRestaurant(){
  let user = getUser();
  return user && user.type === "Restaurant";
}

function isClient(){
  let user = getUser();
  return user && user.type === "Client";
}


function isLivreur(){
  let user = getUser();
  return user && user.type === "Livreur";
}

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Restaurant',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
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
    link: 'book-open-outline',
    home: true,
    hidden: !isRestaurant()
  },
  {
    title: 'Gestion utilisateurs',
    icon: 'people-outline',
    link: 'people-outline',
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
