// Couleur des filtres

function changerCouleurVert() {
    document.querySelector(".btnTous").style.color = "#1D6154";
    document.querySelector(".btnTous").style.backgroundColor = "white"
  }
  function changerCouleurBlanc() {
    document.querySelector(".btnTous").style.color = "white";
    document.querySelector(".btnTous").style.backgroundColor = "#864713"
  }
  
  document.querySelectorAll('.btnConcert, .btnEntreprises, .btnMariages, .btnPortrait').forEach(button => { button.addEventListener("click", changerCouleurVert) })
  document.querySelector(".btnTous").addEventListener("click", changerCouleurBlanc)


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
  buttons[i].addEventListener('click', function() {
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

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener('click', openModal);
  });
  
  // Afficher l'image dans la modale

  function afficherimage() {
    const imagesElements = document.querySelectorAll(".gallery-item");
    const modalWrapper = document.querySelector(".modal-wrapper");
    
    imagesElements.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        
        // Supprime l'ancienne image de la modale s'il y en a une
        while (modalWrapper.firstChild) {
          modalWrapper.removeChild(modalWrapper.firstChild);
        }
        
        const imageElement = document.createElement("img");
        imageElement.src = event.target.src;
        imageElement.alt = "fef";
        
        modalWrapper.appendChild(imageElement);
      });
    });
  }
afficherimage();
  