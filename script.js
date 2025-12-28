let largeur = 0;
let longueur = 0;
let bombQuantity = 0;
let selectedDifficulty = "";
const board = document.getElementById("board");
let mapArray = [];
let totalCells = 0;

//Écoute des boutons de sélection de la difficulté
function listenDifficultyButtons() {
  const difficultyButtons = document.querySelectorAll(".difficulty-button");
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedDifficulty = button.dataset.difficulty
        ? button.dataset.difficulty.toLowerCase()
        : button.textContent.toLowerCase();
      startGame();
    });
  });
}

function hintButtonListener() {
  const hintButton = document.getElementById("hint-button");
}

//Console log des informations de la partie
function showInformations() {
  console.log(`largeur = ${largeur}`);
  console.log(`longueur = ${longueur}`);
  console.log(`bombQuantity = ${bombQuantity}`);
  console.log(`selectedDifficulty = ${selectedDifficulty}`);
}

//Création de la grille de jeu
function createHTMLGrid() {
  if (selectedDifficulty === "easy") {
    largeur = 8;
    longueur = 8;
    bombQuantity = 10;
    const board = document.getElementById("board");
    board.innerHTML = "";
    totalCells = largeur * longueur;
    for (let i = 0; i < totalCells; i++) {
      const button = document.createElement("button");
      button.classList.add("spot");
      board.appendChild(button);
    }
  }
  if (selectedDifficulty === "medium") {
    largeur = 12;
    longueur = 12;
    bombQuantity = 15;
    const board = document.getElementById("board");
    board.innerHTML = "";
    totalCells = largeur * longueur;
    console.log("Nombre total de cases : " + totalCells);
    for (let i = 0; i < totalCells; i++) {
      const button = document.createElement("button");
      button.classList.add("spot");
      board.appendChild(button);
    }
  }
  if (selectedDifficulty === "hard") {
    largeur = 15;
    longueur = 15;
    bombQuantity = 20;
    const board = document.getElementById("board");
    board.innerHTML = "";
    totalCells = largeur * longueur;
    console.log(totalCells);
    for (let i = 0; i < totalCells; i++) {
      const button = document.createElement("button");
      button.classList.add("spot");
      board.appendChild(button);
    }
  }
  return totalCells;
}

// Création d'un tableau représentant la carte du jeu
// Les 0 représentent des cases vides
function createMapArray() {
  mapArray = new Array(largeur * longueur).fill(0);
  return mapArray;
}

// Fonction pour placer les bombes aléatoirement sur la carte
// Les 1 représentent des bombes
function placeBomb(mapArray) {
  console.log(
    `Placement de ${bombQuantity} bombes pour le mode ${selectedDifficulty}`
  );
  if (selectedDifficulty === "easy") {
    let bombPlaced = 0;
    while (bombPlaced < bombQuantity) {
      const bombIndexRandom = Math.floor(Math.random() * (largeur * longueur));
      if (mapArray[bombIndexRandom] === 1) continue;
      mapArray[bombIndexRandom] = 1;
      bombPlaced++;
    }
  }
  if (selectedDifficulty === "medium") {
    let bombPlaced = 0;
    while (bombPlaced < bombQuantity) {
      const bombIndexRandom = Math.floor(Math.random() * (largeur * longueur));
      if (mapArray[bombIndexRandom] === 1) continue;
      mapArray[bombIndexRandom] = 1;
      bombPlaced++;
    }
  }
  if (selectedDifficulty === "hard") {
    let bombPlaced = 0;
    while (bombPlaced < bombQuantity) {
      const bombIndexRandom = Math.floor(Math.random() * (largeur * longueur));
      if (mapArray[bombIndexRandom] === 1) continue;
      mapArray[bombIndexRandom] = 1;
      bombPlaced++;
    }
  }
  console.log(`Map = ${mapArray}`);
  return mapArray;
}

// Fonction pour révéler les bombes sur la grille (fin de partie)
function revealBombs(mapArray) {
  const buttons = document.querySelectorAll(".spot");
  let bombFound = false;

  buttons.forEach((button, mapIndex) => {
    if (mapArray[mapIndex] === 1) {
      bombFound = true;
      button.classList.add("bomb-found");
    }
  });
  if (bombFound == true) {
    document
      .querySelectorAll(".flagged")
      .forEach((flaggedButton) => flaggedButton.classList.remove("flagged"));
  }
}

//fonction pour écouter les clics sur les boutons, et révéler les bombes ou les cases sûres
function gameButtonListener(mapArray) {
  document.querySelectorAll(".spot").forEach((button, mapIndex) => {
    button.addEventListener("click", () => {
      //si la case est une bombe, on révèle toutes les bombes - fin de partie
      if (mapArray[mapIndex] === 1) {
        revealBombs(mapArray);
      }
      if (mapArray[mapIndex] === 0) {
        //si la case est sûre, on calcule le nombre de bombes adjacentes
        const neighborBombCount = findAdjacentBombs(
          mapIndex,
          mapArray,
          findNeighbors(mapIndex, totalCells)
        );
        //on enlève le drapeau si la case était flaggée
        button.classList.remove("flagged");
        if (neighborBombCount > 0) {
          console.log(neighborBombCount);
          button.textContent = neighborBombCount;
          button.classList.add("safe");
        }
        if (neighborBombCount === 0) {
          console.log("Aucune bombe adjacente");
          //algorithme récursif de révélation des cases adjacentes
          for (let i = 0; i < findNeighbors(mapIndex, totalCells).length; i++) {
            const neighborIndex = findNeighbors(mapIndex, totalCells)[i];
            const neighborButton =
              document.querySelectorAll(".spot")[neighborIndex];
            if (!neighborButton.classList.contains("safe")) {
              neighborButton.click();
            }
          }
          button.classList.add("safe");
        }
      }
      checkGameStatus();
    });
    button.addEventListener("mousedown", (event) => {
      if (event.button === 2) {
        event.preventDefault();
        //si la case est déjà révélée, on ne peut pas la flagger
        if (button.classList.contains("bomb-found")) {
          return;
        }
        button.classList.toggle("flagged");
      }
    });
  });
}

function findNeighbors(mapIndex, totalCells) {
  //on ajoute tous les voisins potentiels dans un tableau (par leur index)
  let potentialNeighbors = [];
  let realNeighbors = [];
  const left = mapIndex - 1;
  const right = mapIndex + 1;
  const top = mapIndex - largeur;
  const bottom = mapIndex + largeur;
  const topLeft = mapIndex - largeur - 1;
  const topRight = mapIndex - largeur + 1;
  const bottomLeft = mapIndex + largeur - 1;
  const bottomRight = mapIndex + largeur + 1;
  potentialNeighbors.push(
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight
  );
  //chercher les vrais voisins des cases de gauche
  if (mapIndex % largeur === 0) {
    realNeighbors = potentialNeighbors.filter(
      (x) =>
        x !== left &&
        x !== topLeft &&
        x !== bottomLeft &&
        x >= 0 &&
        x < totalCells
    );
  }
  //chercher les vrais voisins des cases de droite
  else if (mapIndex % largeur === largeur - 1) {
    realNeighbors = potentialNeighbors.filter(
      (x) =>
        x !== right &&
        x !== topRight &&
        x !== bottomRight &&
        x > 0 &&
        x < totalCells
    );
  }
  //chercher les vrais voisins des cases du haut sauf les coins
  else if (mapIndex > 0 && mapIndex < largeur - 1) {
    realNeighbors = potentialNeighbors.filter(
      (x) =>
        x !== top && x !== topRight && x !== topLeft && x >= 0 && x < totalCells
    );
  }
  //chercher les vrais voisins des cases du bas sauf les coins
  else if (mapIndex < totalCells - 1 && mapIndex >= totalCells - largeur + 1) {
    realNeighbors = potentialNeighbors.filter(
      (x) => x !== bottom && x !== bottomRight && x !== bottomLeft
    );
  }
  //chercher toutes les autres cases
  else {
    realNeighbors = potentialNeighbors;
  }
  //console.log("Les voisins de la case " + mapIndex + " sont :" + realNeighbors);
  return realNeighbors;
}

//Fonction pour trouver les bombes adjacentes à une case donnée
function findAdjacentBombs(mapIndex, mapArray, realNeighbors) {
  let neighborBombCount = 0;
  for (let i = 0; i < realNeighbors.length; i++) {
    const neighborIndex = realNeighbors[i];
    if (mapArray[neighborIndex] === 1) {
      neighborBombCount++;
    }
  }
  console.log(
    `Nombre de bombes adjacentes à la case ${mapIndex} : ${neighborBombCount}`
  );
  return neighborBombCount;
}

function playLose() {
  document.getElementById("loseSound").play();
}

function hint() {
  const hint = document.querySelectorAll("hint-button");
  hint.addEventListener("click", () => {
    console.log(mapArray);
    console.log("yesss");
  });
}

// Fonction pour vérifier le statut de la partie (gagnée, perdue ou en cours)
function checkGameStatus() {
  let hasWon =
    document.querySelectorAll(".safe, .flagged").length === totalCells;
  let hasLost = document.querySelectorAll(".bomb-found").length > 0;
  let isGameEnd = hasWon || hasLost;

  if (isGameEnd && hasWon) {
    const endMessage = document.getElementById("endMessage"); // je sélectionne la section du message
    endMessage.innerHTML = "";
    const winMessage = document.createElement("div"); //je créé une div message
    winMessage.classList.add("end-game-win"); // je lui ajoute une classe
    winMessage.textContent = "You won !"; // je lui ajoute un contenu
    endMessage.appendChild(winMessage); // j'ajoute le message à la section
  }
  if (isGameEnd && hasLost) {
    playLose();
    const endMessage = document.getElementById("endMessage"); // je sélectionne la section du message
    endMessage.innerHTML = "";
    const lostMessage = document.createElement("div"); //je créé une div message
    lostMessage.classList.add("end-game-lose"); // donner la classe end-game-lose
    lostMessage.textContent = "You lost !"; // je lui ajoute un contenu
    endMessage.appendChild(lostMessage); // j'ajoute le message à la section
  }
}

// Fonction pour démarrer le jeu
function startGame() {
  endMessage.innerHTML = "";
  board.addEventListener("contextmenu", (event) => event.preventDefault());
  console.log(
    "Bienvenue dans le jeu du démineur ! Difficulté sélectionnée:",
    selectedDifficulty
  );
  showInformations();
  createHTMLGrid();
  board.style.setProperty("--cols", largeur);
  board.style.setProperty("--rows", longueur);
  mapArray = createMapArray();
  placeBomb(mapArray);
  gameButtonListener(mapArray);
  // revealBombs(mapArray); // À supprimer une fois le jeu terminé
}

function resetGame() {
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    if (!selectedDifficulty) {
      console.warn("Sélectionnez une difficulté avant de relancer la partie");
      return;
    }
    board.innerHTML = "";
    startGame();
  });
}

listenDifficultyButtons();
resetGame();
hint();
