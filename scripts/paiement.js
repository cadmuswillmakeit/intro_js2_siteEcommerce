let monBasket = getBasket();

let btnCommander = document.querySelector(".commander");

function panierVide() {
    let containerElement = document.querySelector('#containerElement');
    let divRow = document.createElement('div');
    let divColonne = document.createElement('div');

    containerElement.innerHTML = "";
    divRow.classList.add("row");
    divColonne.classList.add("col");
    divColonne.innerHTML = "<p class=\"text-center\">Oups ! :( <br>Votre panier est vide. <br>Vos articles séléctionnés apparaîtront ici<p>";
    divRow.appendChild(divColonne);
    containerElement.appendChild(divRow);
}
    
function genererArticles (panier) {
    let containerElement = document.querySelector('#containerElement');
    containerElement.innerHTML = "";
    let cardinalPanier = getNumberProduct ();

    document.querySelector(".product_taital").innerHTML=`Article(s) (${cardinalPanier})`;
    let contenuPanier = document.querySelectorAll(".right-cart-num");

    for (let i = 0; i < contenuPanier.length; i++) {
        contenuPanier[i].innerHTML = `${cardinalPanier}`;
    }

    let rowElement = document.createElement('div');
    rowElement.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4', 'mb-4');

    for (let i = 0; i < panier.length; i++) {

        const colonneArticle = document.createElement ("div");
        colonneArticle.classList.add ("col-md-4");

        const carteArticle = document.createElement("div");
        carteArticle.classList.add ('card','h-100');

        const imageArticle = document.createElement ("img");
        imageArticle.src = panier[i].image; 
        imageArticle.classList.add ('card-img-top','image_1');
        imageArticle.alt = panier[i].nom;

        const carteBody = document.createElement ("div");
        carteBody.classList.add ("card-body");

        const titreCarte = document.createElement ("h5");
        titreCarte.classList.add ("card-title");
        titreCarte.innerHTML=`${panier[i].nom}`;

        const textCarte = document.createElement ("p");
        textCarte.classList.add ("card-text");
        textCarte.innerHTML=`${panier[i].description}`;

        const suiteTextCarte = document.createElement ("div");
        suiteTextCarte.classList.add ("content");
        suiteTextCarte.id = panier[i].id;

        const spanInteractif = document.createElement ("button");
        spanInteractif.classList.add ("qt-minus");
        spanInteractif.innerHTML = "-";
        suiteTextCarte.appendChild(spanInteractif);

        const spanInteractif2 = document.createElement ("span");
        spanInteractif2.classList.add ("qt");
        spanInteractif2.innerHTML = `${panier[i].quantity}`;
        suiteTextCarte.appendChild(spanInteractif2);

        const spanInteractif3 = document.createElement ("button");
        spanInteractif3.classList.add ("qt-plus");
        spanInteractif3.innerHTML = "+";
        suiteTextCarte.appendChild(spanInteractif3);

        const spanInteractif4 = document.createElement ("button");
        spanInteractif4.classList.add ("supprimer");

        const icone = document.createElement ("i");
        icone.classList.add ('bi','bi-trash-fill');
        spanInteractif4.appendChild(icone);
        suiteTextCarte.appendChild(spanInteractif4);

        const piedCarte = document.createElement ("div");
        piedCarte.classList.add ("card-footer");

        const smally = document.createElement ("small");
        smally.classList.add ("text-muted");

        const prixUnitaire = document.createElement ("span");
        prixUnitaire.classList.add ("price");
        prixUnitaire.innerHTML = `${panier[i].prix}$`;

        const prixTotalParArticle = document.createElement ("span");
        prixTotalParArticle.classList.add ("full-price");
        prixTotalParArticle.innerHTML = `${panier[i].prix * panier[i].quantity}$`;

        smally.appendChild(prixUnitaire);
        smally.appendChild(prixTotalParArticle);

        piedCarte.appendChild(smally);

        carteBody.appendChild(titreCarte);
        carteBody.appendChild(textCarte);

        carteArticle.appendChild(imageArticle);
        carteArticle.appendChild(carteBody);
        carteArticle.appendChild(suiteTextCarte);
        carteArticle.appendChild(piedCarte);

        colonneArticle.appendChild(carteArticle);

        rowElement.appendChild(colonneArticle);
        if (rowElement.childElementCount === 3) {
            containerElement.appendChild(rowElement);
            rowElement = document.createElement('div');
            rowElement.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4', 'mb-4');
        }
    }
    if (rowElement.childElementCount > 0) {
        containerElement.appendChild(rowElement);
    }
    const totalCourse = document.querySelector(".total-course");
    const totalPrice = getTotalPrice();
    totalCourse.innerHTML = `${totalPrice}`;


    /// Les évènements

    const lesBtnMinus = document.querySelectorAll(".qt-minus");
    const lesBtnPlus = document.querySelectorAll(".qt-plus");
    const lesBtnRetirer = document.querySelectorAll(".supprimer");

    lesBtnMinus.forEach(btnMinus => btnMinus.addEventListener("click", () => {
        const elementparent = btnMinus.parentElement;
        const produitTrouve = monBasket.find(p => p.id == elementparent.id);
        changeQuantity(produitTrouve, -1);
        monBasket = getBasket();
        genererArticles(monBasket);
        if (monBasket.length == 0) {
            panierVide();
        }
    })
    );

    lesBtnPlus.forEach(btnPlus => btnPlus.addEventListener("click", () => {
        console.log("click")
        const elementparent = btnPlus.parentElement;
        const produitTrouve = monBasket.find(p => p.id == elementparent.id);
        addbasket(produitTrouve);
        monBasket = getBasket();
        genererArticles(monBasket);
    })
    );

    lesBtnRetirer.forEach(btnRetirer => btnRetirer.addEventListener("click", () => {
        const elementparent = btnRetirer.parentElement;
        const produitTrouve = monBasket.find(p => p.id == elementparent.id);
        removeFromBasket(produitTrouve);
        monBasket = getBasket();
        genererArticles(monBasket);
        if (monBasket.length == 0) {
            panierVide();
        }
    })
    );


}

btnCommander.addEventListener('click',() => {
    let cardinalPanier = getNumberProduct ();
    if (monBasket.length == 0) {
        document.getElementById('modalTitle').innerHTML = "Commande non valide !"
        document.getElementById("dialogDesc").innerHTML = `Votre panier est vide :(`;
    } else {
        document.getElementById("dialogDesc").innerHTML = `Votre commande a été bien reçue, vous serez livré dans un bref délai`;
        let totalCourse = document.querySelector(".total-course");
        totalCourse.innerHTML = "";
        localStorage.removeItem("basket");
        cardinalPanier = getNumberProduct ();
        document.querySelector(".product_taital").innerHTML=`Article(s) (${cardinalPanier})`;
        let contenuPanier = document.querySelectorAll(".right-cart-num");
        for (let i = 0; i < contenuPanier.length; i++) {
            contenuPanier[i].innerHTML = `${cardinalPanier}`;
        }  
        panierVide();  
    }
});

if (monBasket.length == 0) {
    panierVide();
} else {
    genererArticles(monBasket);
}





