let player1, player2, currentPlayer;
let started;

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const cells = document.getElementsByClassName("cell");
const startButton = document.getElementById("startButton");

window.onload = () => {
  [].forEach.call(cells, (cell) => {
    cell.onclick = () => {
      attemptPlay(cell);
    };
  });

  startButton.onclick = () => {
    attemptStart();
  };

  limitNameInput();
};

function attemptPlay(cell) {
  if (cell.classList.contains("selectableCell")) {
    const piece = currentPlayer.team;
    cell.classList.add(piece);
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
