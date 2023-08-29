function openNav() {
    document.getElementById("mySidenav").style.width = "100%"; 
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

function toggleModal(){
  modalContainer.classList.toggle("actif")
}

const articlesTab = [
    {
        "id": 1,
        "nom": "Beauty Bursh 1",
        "prix": 15,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-1.png"
    },
    {
        "id": 2,
        "nom": "Beauty Bursh 2",
        "prix": 15,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-2.png"
    },
    {
        "id": 3,
        "nom": "Beauty Bursh 3",
        "prix": 15,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-3.png"
    },
    {
        "id": 4,
        "nom": "Beauty Bursh 4",
        "prix": 15,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-4.png"
    },
    {
        "id": 5,
        "nom": "Beauty Bursh 5",
        "prix": 20,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-5.png"
    },
    {
        "id": 6,
        "nom": "Beauty Bursh 6",
        "prix": 20,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-6.png"
    },
    {
        "id": 7,
        "nom": "Beauty Bursh 7",
        "prix": 20,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-7.png"
    },
    {
        "id": 8,
        "nom": "Beauty Bursh 8",
        "prix": 15,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-8.png"
    },
    {
        "id": 9,
        "nom": "Beauty Bursh 9",
        "prix": 30,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-9.png"
    },
    {
        "id": 10,
        "nom": "Beauty Bursh 10",
        "prix": 30,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-10.png"
    },
    {
        "id": 11,
        "nom": "Beauty Bursh 11",
        "prix": 30,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-11.png"
    },
    {
        "id": 12,
        "nom": "Beauty Bursh 12",
        "prix": 30,
        "description": "incididunt ut labore et dolore magna aliqua. Ut enim",
        "image": "images/img-12.png"
    }
]

/*for (let element of articlesTab) {
    console.log(element);
} */

let cardinal = 0;
cardinal = getNumberProduct ();
let mesPaniers = document.querySelectorAll(".right-cart-num");
for (let i = 0; i < mesPaniers.length; i++) {
    mesPaniers[i].innerHTML = `${cardinal}`;
}


const mesProduits = document.querySelectorAll(".produits");

mesProduits.forEach(produit =>  {
    let panierArticle = getBasket();
    let produitDejaAjoutee = panierArticle.find(p => p.id == produit.id);
    if (produitDejaAjoutee !== undefined) {
        produit.firstElementChild.innerHTML = "Retirer du panier";
        produit.firstElementChild.style="background:red";
    } else {
        produit.firstElementChild.innerHTML = "Ajouter au panier";
        produit.firstElementChild.removeAttribute("style");
    }
});


mesProduits.forEach(produit => produit.addEventListener("click", () => {
    let produitTrouve = articlesTab.find(p => p.id == produit.id);
    let panierArticles = getBasket();
    let produitDejaAjoute = panierArticles.find(p => p.id == produit.id);
    if (produitDejaAjoute !== undefined) {
        removeFromBasket(produitDejaAjoute);
        produit.firstElementChild.innerHTML = "Ajouter au panier";
        produit.firstElementChild.removeAttribute("style");
        document.getElementById("modalTitle").innerHTML = "Retrait du panier";
        document.getElementById("dialogDesc").innerHTML = `Vous avez retiré ${produitTrouve.nom} de votre panier`;
    } else {
        addbasket(produitTrouve);
        produit.firstElementChild.innerHTML = "Retirer du panier";
        produit.firstElementChild.style="background:red";
        document.getElementById("modalTitle").innerHTML = "Ajout au panier";
        document.getElementById("dialogDesc").innerHTML = `Vous venez d'ajouter ${produitTrouve.nom} à votre panier`;
    }
    cardinal = getNumberProduct ();
    for (let i = 0; i < mesPaniers.length; i++) {
        mesPaniers[i].innerHTML = `${cardinal}`;
    }
}));
