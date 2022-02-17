let playerColor;
let c, r;

function checkVictory() {
  const victory = checkGrid();
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
      const cell = document.getElementById("cell" + column + "-" + row);
      const color = "#" + rgba2hex(cell.style.backgroundColor);
      if (color === playerColor) {
        c = column;
        r = row;
        const result = checkRow()
          ? true
          : checkColumn()
          ? true
          : checkDiagonalA()
          ? true
          : checkDiagonalB();
        if (result) {
          return result;
        }
      }
    }
  }
  return false;
}

function checkRow() {
  let pieces = 0;
  for (let row = r; row < r + 3; row++) {
    let cell = document.getElementById("cell" + c + "-" + row);
    if (cell == null) {
      return false;
    }
    let color = "#" + rgba2hex(cell.style.backgroundColor);
    if (color === playerColor) {
      pieces++;
      if (pieces == 3) {
        return true;
      }
    }
  }
  return false;
}

function checkColumn() {
  let pieces = 0;
  for (let column = c; column < c + 3; column++) {
    let cell = document.getElementById("cell" + column + "-" + r);
    if (cell == null) {
      return false;
    }
    let color = "#" + rgba2hex(cell.style.backgroundColor);
    if (color === playerColor) {
      pieces++;
      if (pieces == 3) {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonalA() {
  let pieces = 0;
  for (let i = 0; i < 3; i++) {
    const column = c + i;
    const row = r + i;
    const cell = document.getElementById("cell" + column + "-" + row);
    if (cell == null) {
      return false;
    }
    let color = "#" + rgba2hex(cell.style.backgroundColor);
    if (color === playerColor) {
      pieces++;
      if (pieces == 3) {
        return true;
      }
    }
  }
}

function checkDiagonalB() {
  pieces = 0;
  for (let i = 0; i < 3; i++) {
    const column = c + i;
    const row = r - i;
    const cell = document.getElementById("cell" + column + "-" + row);
    if (cell == null) {
      return false;
    }
    let color = "#" + rgba2hex(cell.style.backgroundColor);
    if (color === playerColor) {
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
