let player1, player2, currentPlayer;
let started, ended;
let nameInputWidth;

let timeout;
const messages = document.getElementsByClassName("message");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const cells = document.querySelectorAll(".cell");
const player1Image = document.getElementById("teamImage1");
const player2Image = document.getElementById("teamImage2");
const PvPButton = document.getElementById("PvPButton");
const PvEButton = document.getElementById("PvEButton");

window.onload = () => {
  [].forEach.call(cells, (cell) => {
    cell.onclick = () => {
      attemptMove(cell);
    };
  });

  PvPButton.onclick = () => {
    if (ended && player2.name === "A.I.") {
      resetNameInputs();
      resetCells();
      resetTeamImages();
      [...messages].forEach((message) => {
        message.innerHTML = "Welcome to Groxar's Tic Tac Toe!";
      });
      started = false;
      ended = false;
      return;
    }
    startMultiplayer();
  };

  PvEButton.onclick = () => {
    startSinglePlayer();
  };

  nameInputWidth = input1.offsetWidth;
  limitNameInput();
};

function resetNameInputs() {
  input1.innerHTML = "";
  input2.innerHTML = "";
  input1.style.color = "black";
  input2.style.color = "black";
  input1.style.animationName = "";
  input2.style.animationName = "";
  input1.classList.remove("disabledNameInput");
  input1.contentEditable = true;
  input2.classList.remove("disabledNameInput");
  input2.contentEditable = true;
}

function resetCells() {
  [].forEach.call(cells, (cell) => {
    cell.classList.remove("x", "o");
  });
}

function resetTeamImages() {
  player1Image.classList.remove("x", "o");
  player2Image.classList.remove("x", "o");
}

window.onresize = () => {
  nameInputs = document.querySelectorAll(".nameInput");
  nameInputs.forEach((nameInput) => {
    nameInput.innerHTML = nameInput.innerHTML.substr(0, 5);
  });
  nameInputWidth = nameInputs[0].offsetWidth;
};

function attemptMove(cell) {
  if (cell.classList.contains("selectableCell")) {
    const piece = currentPlayer.team;
    cell.classList.add(piece);
    cell.classList.remove("selectableCell");
    if (checkVictory()) {
      return true;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    if (currentPlayer.name === "A.I.") {
      makeAIMove();
    }
    return true;
  }
  return false;
}

function startMultiplayer() {
  console.log("ASD");
  const name1 = input1.innerHTML;
  const name2 = input2.innerHTML;
  if (name1 === name2) {
    showError("Names can't be equal");
    return;
  }
  initialSetup(name1, name2);
}

function startSinglePlayer() {
  if (!initialSetup(input1.innerHTML)) {
    return;
  }
  input2.innerHTML = "A.I.";
  player2.name = "A.I.";
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
  updateTeamImages();
  setupCells();
  disablePanels();
  clearTimeout(timeout);
  [...messages].forEach((message) => {
    message.innerHTML = "Fight!";
  });
  started = true;
  ended = false;
  return true;
}

function validatePlayerNames(...names) {
  for (let i = 0; i < names.length; i++) {
    if (!(checkLength(names[i], i + 1) && checkLetters(names[i], i + 1))) {
      return false;
    }
  }
  return true;
}

function checkLetters(name, player) {
  const letters = /^[A-Za-z]+$/;
  if (letters.test(name)) {
    return true;
  }
  showError("Name " + player + " has invalid characters");
  return false;
}

function checkLength(name, player) {
  if (name.length >= 3) {
    return true;
  }
  showError("Name " + player + " is too short");
  return false;
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
  const name1 = input1.innerHTML;
  const name2 = input2.innerHTML;
  const random = Math.random() < 0.5;
  player1 = new player(name1, random ? "x" : "o");
  player2 = new player(name2, random ? "o" : "x");
  currentPlayer = random ? player1 : player2;

  input1.style.color = "red";
  input2.style.color = "red";
  input1.style.animationName = player1.team + "Colorchange";
  input2.style.animationName = player2.team + "Colorchange";
}

function updateTeamImages() {
  player1Image.classList.remove("x", "o");
  player1Image.classList.add(player1.team);
  player2Image.classList.remove("x", "o");
  player2Image.classList.add(player2.team);
}

function setupCells() {
  [].forEach.call(cells, (cell) => {
    cell.classList.add("selectableCell");
    cell.classList.remove("x", "o");
  });
}

function disablePanels() {
  input1.classList.add("disabledNameInput");
  input1.contentEditable = false;
  input2.classList.add("disabledNameInput");
  input2.contentEditable = false;
  PvPButton.classList.add("noHover");
  PvEButton.classList.add("noHover");
}

class player {
  constructor(name, team) {
    this.name = name;
    this.team = team;
  }
}

function limitNameInput() {
  nameInputs = document.getElementsByClassName("nameInput");
  [].forEach.call(nameInputs, (nameInput) => {
    const observer = new MutationObserver(() => {
      var len = nameInput.innerHTML.length;
      inputWidth = nameInput.offsetWidth;
      if (inputWidth > nameInputWidth) {
        nameInput.innerHTML = nameInput.innerHTML.substr(0, len - 1);
      }
    });
    observer.observe(nameInput, { characterData: true, subtree: true });
  });
}

function checkVictory() {
  victory = checkRows() ? true : checkColumns() ? true : checkDiagonals();
  if (victory) {
    disableCells();
    showVictoryMessage();
    enableButtons();
    ended = true;
  }
  return victory;
}

function checkRows() {
  piece = currentPlayer.team;
  for (let row = 0; row < 3; row++) {
    pieces = 0;
    for (let column = 0; column < 3; column++) {
      const cell = document.getElementById("cell" + column + row);
      if (cell.classList.contains(piece)) {
        pieces++;
        if (pieces == 3) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkColumns() {
  piece = currentPlayer.team;
  for (let column = 0; column < 3; column++) {
    pieces = 0;
    for (let row = 0; row < 3; row++) {
      const cell = document.getElementById("cell" + column + row);
      if (cell.classList.contains(piece)) {
        pieces++;
        if (pieces == 3) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkDiagonals() {
  piece = currentPlayer.team;
  pieces = 0;
  for (let i = 0; i < 3; i++) {
    const cell = document.getElementById("cell" + i + i);
    if (cell.classList.contains(piece)) {
      pieces++;
      if (pieces == 3) {
        return true;
      }
    }
  }
  pieces = 0;
  for (let i = 0; i < 3; i++) {
    inverse = 2 - i;
    const cell = document.getElementById("cell" + i + inverse);
    if (cell.classList.contains(piece)) {
      pieces++;
      if (pieces == 3) {
        return true;
      }
    }
  }
  return false;
}

function disableCells() {
  cells.forEach((cell) => {
    cell.classList.remove("selectableCell");
  });
}

function showVictoryMessage() {
  [...messages].forEach((message) => {
    message.innerHTML = currentPlayer.name + " WINS!!!";
  });
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

/*
2. Scores
*/
