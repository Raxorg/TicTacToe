let players = [];
let currentPlayerIndex = 0;
let currentPlayer;
let started, ended;
let mode;

let timeout;
const messages = document.getElementsByClassName("message");
const PvPButton = document.getElementById("PvPButton");
const PvEButton = document.getElementById("PvEButton");

window.onload = () => {
  PvPButton.onclick = () => {
    initPlayers();
    startMultiplayer();
  };

  PvEButton.onclick = () => {
    startSinglePlayer();
  };
  makeGrid();
  initGrid();
  makeNameInputs(10);
  limitNameLength();
};

window.onresize = () => {
  nameInputs = document.querySelectorAll(".nameInput");
  nameInputs.forEach((nameInput) => {
    nameInput.innerHTML = nameInput.innerHTML.substr(0, 5);
  });
  nameInputWidth = nameInputs[0].offsetWidth;
};

function startMultiplayer() {
  if (ended && mode === modePvE) {
    reset();
    return;
  }
  if (initialSetup(getPlayerNames())) {
    mode = modePvP;
  }
}

function reset() {
  grid.classList.add("modifiable");
  resetNameInputs();
  clearCells();
  disableCells();
  [...messages].forEach((message) => {
    message.innerHTML = "Welcome to Groxar's Tic Tac Toe!";
  });
  started = false;
  ended = false;
}

function startSinglePlayer() {
  if (!initialSetup([getFirstName()])) {
    return;
  }
  spawnAIs();
  [...messages].forEach((message) => {
    message.innerHTML = "You are weak, human";
  });
  mode = modePvE;
}

function initialSetup(...names) {
  if (started && !ended) {
    return false;
  }
  if (!validatePlayerNames(...names)) {
    return false;
  }
  initPlayers();
  clearCells();
  enableCells();
  assignColors();
  disablePanels();
  clearTimeout(timeout);
  [...messages].forEach((message) => {
    message.innerHTML = "Fight!";
  });
  started = true;
  ended = false;
  grid.classList.remove("modifiable");
  return true;
}

function showError(error) {
  clearTimeout(timeout);
  [...messages].forEach((message) => {
    message.innerHTML = error;
  });
  timeout = setTimeout(() => {
    [...messages].forEach((message) => {
      message.innerHTML = "Welcome to Groxar's Tic Tac Toe!";
    });
  }, 2500);
}

function initPlayers() {
  const playerNames = getPlayerNames();
  for (let i = 0; i < playerNames.length; i++) {
    const randomPiece = randomInt(2) ? "x" : "o";
    players[i] = new Player(playerNames[i], randomPiece);
  }
  currentPlayer = players[0];
}

function disablePanels() {
  disableNameInputs();
  PvPButton.classList.remove("enabled");
  PvEButton.classList.remove("enabled");
}

function enableButtons() {
  PvPButton.classList.add("enabled");
  PvEButton.classList.add("enabled");
}

function spawnAIs() {
  players[1] = new Player("A.I.", randomInt(2) ? "x" : "o");
  players[2] = new Player("Beep", randomInt(2) ? "x" : "o");
  players[3] = new Player("Robo", randomInt(2) ? "x" : "o");
  players[4] = new Player("Boop", randomInt(2) ? "x" : "o");
  players[5] = new Player("Bot", randomInt(2) ? "x" : "o");
  players[6] = new Player("Computer", randomInt(2) ? "x" : "o");
  players[7] = new Player("PC", randomInt(2) ? "x" : "o");
  players[8] = new Player("Chip", randomInt(2) ? "x" : "o");
  for (let i = 1; i < 9; i++) {
    nameInputs[i].innerHTML = players[i].name;
  }
}

function makeAIMove() {
  randomCol = randomInt(dimensions);
  randomRow = randomInt(dimensions);
  const cell = document.getElementById("cell" + randomCol + "-" + randomRow);
  if (!attemptMove(cell)) {
    makeAIMove();
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function addScore(player) {
  score = Number(localStorage.getItem(player)) + 1;
  localStorage.setItem(player, score);
}

class Player {
  constructor(name, team) {
    this.name = name;
    this.team = team;
  }
}
