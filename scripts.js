let player1, player2, currentPlayer;
let started;
let nameInputWidth;

const messages = document.getElementsByClassName("message");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const cells = document.querySelectorAll(".cell");
const PvPButton = document.getElementById("PvPButton");

window.onload = () => {
  [].forEach.call(cells, (cell) => {
    cell.onclick = () => {
      attemptMove(cell);
    };
  });

  PvPButton.onclick = () => {
    attemptStart();
  };

  nameInputWidth = input1.offsetWidth;
  limitNameInput();
};

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
    checkVictory();
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
}

function attemptStart() {
  if (started) {
    return;
  }
  if (!validatePlayerNames()) {
    return;
  }
  initPlayers();
  updateTeamImages();
  enableCells();
  disablePanels();
  started = true;
}

function validatePlayerNames() {
  const name1 = input1.innerHTML;
  const name2 = input2.innerHTML;

  if (!(checkLetters(name1, 1) && checkLength(name1, 1))) {
    return false;
  }
  if (!(checkLetters(name2, 2) && checkLength(name2, 2))) {
    return false;
  }
  if (name1 === name2) {
    showError("Names can't be equal");
    return false;
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
  [...messages].forEach((message) => {
    message.innerHTML = error;
  });
  setTimeout(() => {
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
  const player1Image = document.getElementById("teamImage1");
  const player2Image = document.getElementById("teamImage2");
  player1Image.classList.add(player1.team);
  player2Image.classList.add(player2.team);
}

function enableCells() {
  [].forEach.call(cells, (cell) => {
    cell.classList.add("selectableCell");
  });
}

function disablePanels() {
  input1.classList.add("disabledNameInput");
  input1.contentEditable = false;
  input2.classList.add("disabledNameInput");
  input2.contentEditable = false;
  PvPButton.classList.add("noHover");
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
  }
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

/*
1. RESET
*/
