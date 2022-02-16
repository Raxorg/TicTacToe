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
    resetNameInputs();
    clearCells();
    disableCells();
    [...messages].forEach((message) => {
      message.innerHTML = "Welcome to Groxar's Tic Tac Toe!";
    });
    started = false;
    ended = false;
    return;
  }
  initialSetup(getPlayerNames());
}

function startSinglePlayer() {
  if (!initialSetup(getFirstName())) {
    return;
  }
  makeSecondNameAI();
  [...messages].forEach((message) => {
    message.innerHTML = "You are weak, human";
  });
  if (player2.team === "x") {
    makeAIMove();
  }
}

function initialSetup(...names) {
  if (started && !ended) {
    return false;
  }
  if (!validatePlayerNames(...names)) {
    return false;
  }
  initPlayers();
  enableCells();
  assignColors();
  disablePanels();
  clearTimeout(timeout);
  [...messages].forEach((message) => {
    message.innerHTML = "Fight!";
  });
  started = true;
  ended = false;
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
  PvPButton.classList.remove("noHover");
  PvEButton.classList.remove("noHover");
}

function makeAIMove() {
  randomCol = randomInt(3);
  randomRow = randomInt(3);
  const cell = document.getElementById("cell" + randomCol + randomRow);
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
