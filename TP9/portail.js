// Liste des spritesheets
const skins = [];
for (let i = 1; i <= 29; i++) {
  skins.push(`assets/${i}.png`);
}

const frameWidth = 64;   // largeur d'un perso dans la spritesheet
const frameHeight = 64;  // hauteur d'un perso
const canvasSize = 64;   // taille d'affichage sur le portail

const container = document.getElementById("skins-container");

skins.forEach((path, index) => {
  // wrapper pour chaque skin
  const wrapper = document.createElement("div");
  wrapper.classList.add("skin-wrapper");

  // canvas pour afficher le personnage
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // radio button pour la sélection
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "skinPath";
  input.value = path;
  if (index === 0) input.checked = true; // sélection par défaut du premier skin

  wrapper.appendChild(canvas);
  wrapper.appendChild(input);
  container.appendChild(wrapper);

  // créer l'image et dessiner sur le canvas
  const img = new Image();
  img.src = path;
  img.onload = () => {
    const ctx = canvas.getContext("2d");

    const frameIndex = 0; // premier perso de la ligne
    const rowIndex = 2;   // ligne "bas" = personnage qui regarde vers le joueur

    ctx.drawImage(
      img,
      frameIndex * frameWidth, // sx
      rowIndex * frameHeight,  // sy
      frameWidth,              // sw
      frameHeight,             // sh
      0, 0,                    // dx, dy sur le canvas
      canvasSize, canvasSize   // dw, dh
    );
  };

  // cliquer sur le canvas sélectionne automatiquement le skin
  canvas.addEventListener("click", () => {
    input.checked = true;
  });
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // empêche l'envoi classique du formulaire

  const pseudo = form.querySelector('input[type="name"]').value;
  const serverUrl = form.querySelector('input[type="text"]').value;
  const skinPath = document.querySelector('input[name="skinPath"]:checked')?.value;

  if (pseudo === "" || serverUrl === "") {
    alert("Error: pseudo or server URL missing")
  }
  if (pseudo !== "" && serverUrl !== "") {
    localStorage.setItem("pseudo", pseudo);
    localStorage.setItem("serverUrl", serverUrl);
    localStorage.setItem("skinPath", skinPath);
  
    window.location.href = "game.html";
  }

});

