let playerColor;

function checkVictory() {
  //const victory = checkGrid();
  const victory = checkRows() ? true : checkColumns() ? true : checkDiagonals();
  if (victory) {
    addScore(currentPlayer.name);
    disableCells();
    showVictoryMessage();
    enableButtons();
    ended = true;
  } else {
    checkDraw();
  }
  return victory;
}

function checkGrid() {
  playerColor = colors[currentPlayerIndex];
  for (let column = 0; column < dimensions; column++) {
    for (let row = 0; row < dimensions; row++) {
      const cell = document.getElementById("cell" + column + row);
      const color = "#" + rgba2hex(cell.style.backgroundColor);
      if (color === playerColor) {
        if (checkRow(column, row)) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkRow(column, row) {
  let pieces = 0;
  for (let r = row; r < row + 3; row++) {
    console.log("cell" + column + r);
    let cell = document.getElementById("cell" + column + row);
    if (cell == null) {
      return false;
    }
    let cellColor = "#" + rgba2hex(cell.style.backgroundColor);
    if (cellColor === playerColor) {
      pieces++;
      if (pieces == 3) {
        return true;
      }
    }
  }
  return false;
}

function checkRows() {
  const piece = currentPlayer.team;
  for (let row = 0; row < 3; row++) {
    let pieces = 0;
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

function checkDraw() {
  emptyCells = 0;
  [...cells].forEach((cell) => {
    if (cell.classList.contains("selectableCell")) {
      emptyCells++;
    }
  });
  if (emptyCells === 0) {
    [...messages].forEach((message) => {
      message.innerHTML = "Draw! :/";
      enableButtons();
      ended = true;
    });
  }
}

function showVictoryMessage() {
  [...messages].forEach((message) => {
    victories = localStorage.getItem(currentPlayer.name);
    message.innerHTML = currentPlayer.name + " WINS!!! Victories: " + victories;
  });
}

function rgba2hex(orig) {
  var a,
    isPercent,
    rgb = orig
      .replace(/\s/g, "")
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || "").trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = 01;
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1);
  hex = hex + a;

  return hex;
}
