// Variables globales
let compteur = 0; // Compteur qui permet de connaître l'image sur laquelle on se trouve
let timer, elements, slides, slideWidth, speed, transition;

window.onload = () => {
    // On récupère le diaporama
    const diapo = document.querySelector(".diapo");
    // On récupère le data-speed
    speed = diapo.dataset.speed;
    transition = diapo.dataset.transition;

    elements = document.querySelector(".elements");

    // On clone la 1ère image
    let firstImage = elements.firstElementChild.cloneNode(true);

    // On injecte le clone à la fin du diapo
    elements.appendChild(firstImage);

    slides = Array.from(elements.children);

    // On récupère la largeur d'une slide
    slideWidth = diapo.getBoundingClientRect().width;

    // On récupère les flèches
    let next = document.querySelector(".carousel-control-next");
    let prev = document.querySelector(".carousel-control-prev");

    // On gère le clic
    next.addEventListener("click", slideNext);
    prev.addEventListener("click", slidePrev);

    // On automatise le défilement
    timer = setInterval(slideNext, speed);

    // On gère l'arrêt et la reprise
    diapo.addEventListener("mouseover", stopTimer);
    diapo.addEventListener("mouseout", startTimer);
}

/**
 * Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext(){
    // On incrémente le compteur
    compteur++;
    elements.style.transition = transition+"ms linear";

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;

    const activeButton = document.querySelector('.carousel-indicators .active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    const nextButton = document.querySelector(`#btn${compteur + 1}`);
    if (nextButton) {
        nextButton.classList.add('active');
    }

    // On attend la fin de la transition et on "rembobine" de façon cachée
    setTimeout(function(){
        if(compteur >= slides.length - 1){
            compteur = 0;
            elements.style.transition = "unset";
            elements.style.transform = "translateX(0)";
            const firstButton = document.querySelector('#btn1');
            firstButton.classList.add('active');

        }
    }, transition);
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev(){
    // On décrémente le compteur
    compteur--;
    elements.style.transition = transition+"ms linear";

    const activeButton = document.querySelector('.carousel-indicators .active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    const nextButton = document.querySelector(`#btn${compteur + 1}`);
    if (nextButton) {
        nextButton.classList.add('active');
    }

    if(compteur < 0){
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur;
        elements.style.transition = "unset";
        elements.style.transform = `translateX(${decal}px)`;
        setTimeout(slidePrev, 1);
    }

    let decal = -slideWidth * compteur;
    elements.style.transform = `translateX(${decal}px)`;
    
}

function stopTimer(){
    clearInterval(timer);
}

function startTimer(){
    timer = setInterval(slideNext, speed);
}

// Boutons du carroussel

const buttonsCar = document.querySelectorAll('.carousel-indicators button');

for (let button of buttonsCar) {
  button.addEventListener('click', () => {
    const index = parseInt(button.id.substring(3)) - 1;
    // Si l'index est supérieur au compteur, on fait glisser vers la droite.
    if (index > compteur) {
      for (let i = -1; i < index - compteur; i++) {
        slideNext();
      }
    }
    // Si l'index est inférieur au compteur, on fait glisser vers la gauche.
    else if (index < compteur) {
      for (let i = -1; i < compteur - index; i++) {
        slidePrev();
      }
    }
  });
}



// Couleur des filtres

var buttonsCouleurs = document.querySelectorAll('.filtres button');

// boucle à travers les boutons et ajoute un événement de clic
for (var i = 0; i < buttonsCouleurs.length; i++) {
  buttonsCouleurs[i].addEventListener('click', function() {
    
    for (var j = 0; j < buttonsCouleurs.length; j++) {
      buttonsCouleurs[j].style.color = "#864713";
      buttonsCouleurs[j].style.backgroundColor = "white";
    }
    this.style.color = "white";
    this.style.backgroundColor = "#864713";
  });
}


//   Fonction filtre 

// // Avec ForEach
// const buttons = document.querySelectorAll('.filtres button');
// const images = document.querySelectorAll('.gallery-item');

// // Ajout de l'événement "click" à chaque bouton de filtre
// buttons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const tag = button.textContent;
//     images.forEach((img) => {
//       img.style.display = (img.getAttribute('data-tag') === tag || tag === 'Tous') ? 'block' : 'none';
//     });
//   });
// });

// Avec For...of
const buttons = document.querySelectorAll('.filtres button');
const images = document.querySelectorAll('.gallery-item');

// Ajout de l'événement "click" à chaque bouton de filtre
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        const tag = this.textContent;
        for (let j = 0; j < images.length; j++) {
            images[j].style.display = (images[j].getAttribute('data-tag') === tag || tag === 'Tous') ? 'block' : 'none';
        }
    });
}

// On utilise une boucle for...of pour itérer sur chaque bouton du filtre. 
// Ensuite, pour chaque bouton, on ajoute un écouteur d'événement click qui exécute une fonction.
// La fonction récupère le texte contenu dans le bouton cliqué (défini dans la variable tag) et itère sur chaque image
// (définies dans la variable images) en vérifiant si l'attribut data-tag de chaque image correspond au tag du bouton
// cliqué. Si c'est le cas, la valeur de display de l'image est définie sur block, sinon elle est définie sur none.


// Modale

let modal = null;
let currentImageIndex = 0;
function stopPropagation(e) {
    e.stopPropagation()
}

function closeModal(e) {
    if (modal === null) return;
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', true)
    modal.setAttribute('aria-modal', false)
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

function openModal(e) {
    e.preventDefault();
    const target = document.querySelector('.modal')
    target.style.display = null
    target.setAttribute('aria-hidden', false)
    target.setAttribute('aria-modal', true)
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
        closeModal(e)
    }
})

function afficherimage() {
    const imagesElements = document.querySelectorAll(".gallery-item");
    const modalWrapper = document.querySelector(".modal-wrapper");

    for (let index = 0; index < imagesElements.length; index++) {
        const item = imagesElements[index];
        item.addEventListener('click', openModal); // Ouverture de la modale

        item.addEventListener("click", function (event) {
            event.preventDefault();

            // Supprime l'ancienne image de la modale s'il y en a une
            while (modalWrapper.firstChild) {
                modalWrapper.removeChild(modalWrapper.firstChild);
            }

            const imageElement = document.createElement("img");
            imageElement.src = event.target.src;
            imageElement.alt = event.target.alt;

            const leftBtn = document.createElement("button")
            leftBtn.className = "modal-prev-btn"
            leftBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                } else {
                    currentImageIndex = imagesElements.length - 1;
                }
                imageElement.src = imagesElements[currentImageIndex].src;
                imageElement.alt = imagesElements[currentImageIndex].alt;
            });

            const rightBtn = document.createElement("button")
            rightBtn.className = "modal-next-btn"
            rightBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (currentImageIndex < imagesElements.length - 1) {
                    currentImageIndex++;
                } else {
                    currentImageIndex = 0;
                }
                imageElement.src = imagesElements[currentImageIndex].src;
                imageElement.alt = imagesElements[currentImageIndex].alt;
            });

            modalWrapper.appendChild(leftBtn);
            modalWrapper.appendChild(rightBtn);
            modalWrapper.appendChild(imageElement);

            currentImageIndex = index;
        });
    }
}
afficherimage();