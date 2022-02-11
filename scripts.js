let player1, player2, currentPlayer;
let started;

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const cells = document.getElementsByClassName("cell");
const startButton = document.getElementById("startButton");

window.onload = () => {
  [].forEach.call(cells, (cell) => {
    cell.onclick = () => {
      attemptMove(cell);
    };
  });

  startButton.onclick = () => {
    attemptStart();
  };

  limitNameInput();
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
  const letters = /^[A-Za-z]+$/;
  if (!letters.test(name1) || !name1.length > 2) {
    alert("invalid name 1");
    return false;
  }
  if (!letters.test(name2) || !name2.length > 2) {
    alert("invalid name 2");
    return false;
  }
  if (name1 === name2) {
    alert("names are equal");
    return false;
  }
  return true;
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
  startButton.classList.add("noHover");
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
      if (len > 10) {
        nameInput.innerHTML = nameInput.innerHTML.substr(0, 10);
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
  console.log("Checking diagonals");
  piece = currentPlayer.team;
  pieces = 0;
  for (let i = 0; i < 3; i++) {
    const cell = document.getElementById("cell" + i + i);
    console.log("Checking cell" + i + i);
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
  [].forEach.call(cells, (cell) => {
    cell.classList.remove("selectableCell");
  });
}

function showVictoryMessage() {
  messages = document.getElementsByClassName("message");
  [].forEach.call(messages, (message) => {
    message.innerHTML = currentPlayer.name + " WINS!!!";
  });
}
