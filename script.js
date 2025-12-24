let largeur = 0;
let longueur = 0;
let bombQuantity = 0;
let gameDifficulty = "x";


//Choix du niveau de difficulté par le joueur
function chooseLevel() {
  gameDifficulty = prompt("Mode de jeu: (easy/medium/hard)");
  if (gameDifficulty == "easy") {
    largeur = 8;
    longueur = 8;
    bombQuantity = 10;
  }
  if (gameDifficulty == "medium") {
    largeur = 12;
    longueur = 12;
    bombQuantity = 15;
  }
  if (gameDifficulty == "hard") {
    largeur = 15;
    longueur = 15;
    bombQuantity = 20;
  }
  if (
    gameDifficulty !== "easy" &&
    gameDifficulty !== "medium" &&
    gameDifficulty !== "hard"
  ) {
    console.log("Veuillez entrer un des 3 choix possibles");
    return chooseLevel();
  }
  console.log(`largeur = ${largeur}`);
  console.log(`longueur = ${longueur}`);
  console.log(`bombQuantity = ${bombQuantity}`);
  console.log(`gameDifficulty = ${gameDifficulty}`);
  return gameDifficulty;
}

//Création de la grille de jeu
function createGrid() {
  console.log(gameDifficulty);
  if (gameDifficulty === "easy") {
    const board = document.getElementById("board");
    board.innerHTML = "";
    const totalCells = largeur * longueur;
    console.log(totalCells);
    for (let i = 0; i < totalCells; i++) {
      const button = document.createElement("button");
      button.classList.add("spot");
      board.appendChild(button);
    }
  }
  if (gameDifficulty === "medium") {
    const board = document.getElementById("board");
    board.innerHTML = "";
    const totalCells = largeur * longueur;
    console.log(totalCells);
    for (let i = 0; i < totalCells; i++) {
      const button = document.createElement("button");
      button.classList.add("spot");
      board.appendChild(button);
    }
  }
  if (gameDifficulty === "hard") {
    const board = document.getElementById("board");
    board.innerHTML = "";
    const totalCells = largeur * longueur;
    console.log(totalCells);
    for (let i = 0; i < totalCells; i++) {
      const button = document.createElement("button");
      button.classList.add("spot");
      board.appendChild(button);
    }
  }
}

 // Création d'un tableau représentant la carte du jeu
  // Les 0 représentent des cases vides
function createMapArray() {
  let mapArray = new Array(largeur * longueur).fill(0);
  console.log(`Map = ${mapArray}`);
  return mapArray;
}

// Fonction pour placer les bombes aléatoirement sur la carte
// Les 1 représentent des bombes
function placeBomb(mapArray) {

  console.log(
    `Placement de ${bombQuantity} bombes pour le mode ${gameDifficulty}`
  );
  if (gameDifficulty === "easy") {
    let bombPlaced = 0;
    while (bombPlaced < bombQuantity) {
      const bombIndexRandom = Math.floor(Math.random() * (largeur * longueur));
      if (mapArray[bombIndexRandom] === 1) continue;
      mapArray[bombIndexRandom] = 1;
      bombPlaced++;
    }
  }
  if (gameDifficulty === "medium") {
    let bombPlaced = 0;
    while (bombPlaced < bombQuantity) {
      const bombIndexRandom = Math.floor(Math.random() * (largeur * longueur));
      if (mapArray[bombIndexRandom] === 1) continue;
      mapArray[bombIndexRandom] = 1;
      bombPlaced++;
    }
  }
  if (gameDifficulty === "hard") {
    let bombPlaced = 0;
    while (bombPlaced < bombQuantity) {
      const bombIndexRandom = Math.floor(Math.random() * (largeur * longueur));
      if (mapArray[bombIndexRandom] === 1) continue;
      mapArray[bombIndexRandom] = 1;
      bombPlaced++;
    }
  }
  console.log(mapArray);
  return mapArray;
}

// Fonction pour révéler les bombes sur la grille (fin de partie)
function revealBombs(mapArray) {
  const buttons = document.querySelectorAll(".spot");
  buttons.forEach((button, index) => {
    if (mapArray[index] === 1) {
      button.classList.add("bomb");
    }
  });
}

// Fonction pour démarrer le jeu
function startGame() {
  console.log("Bienvenue dans le jeu du démineur!");
  chooseLevel();
  board.style.setProperty("--cols", largeur);
  board.style.setProperty("--rows", longueur);
  createGrid();
  let mapArray = createMapArray();
  placeBomb(mapArray);
  revealBombs(mapArray);
}

function resetGame() {
  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", function () {
    board.innerHTML = "";
    largeur = 0;
    longueur = 0;
    bombQuantity = 0;
    gameDifficulty = "x";
    mapArray = [];
    startGame();
  });
}

startGame();
resetGame();
