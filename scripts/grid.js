let cells;
let dimensions = 3;

function initGrid() {
  grid.onclick = () => {
    dimensions++;
    if (dimensions > 20) {
      dimensions = 3;
    }
    makeGrid();
  };
}

function makeGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  const cellSizePct = 100 / dimensions;
  const templateColumns = "repeat(" + dimensions + ", " + cellSizePct + "%)";
  grid.style.gridTemplateColumns = templateColumns;
  for (let column = 0; column < dimensions; column++) {
    for (let row = 0; row < dimensions; row++) {
      makeCell(column, row);
    }
  }
  cells = grid.children;
  squareCells(dimensions);
}

function makeCell(column, row) {
  const cell = document.createElement("img");
  cell.setAttribute("id", "cell" + column + "-" + row);
  cell.classList.add("cell");
  cell.onclick = () => {
    attemptMove(cell);
  };
  grid.appendChild(cell);
}

function attemptMove(cell) {
  if (cell.classList.contains("selectableCell")) {
    const piece = currentPlayer.team;
    cell.classList.add(piece);
    cell.style.backgroundColor = colors[currentPlayerIndex];
    cell.classList.remove("selectableCell");
    if (checkVictory()) {
      return true;
    }
    currentPlayerIndex++;
    if (currentPlayerIndex === players.length) {
      currentPlayerIndex = 0;
    }
    currentPlayer = players[currentPlayerIndex];
    if (currentPlayerIndex != 0 && mode == modePvE) {
      console.log("ASD");
      makeAIMove();
    }
    return true;
  }
  return false;
}

function squareCells(dimensions) {
  const size = grid.offsetHeight / dimensions;
  [...cells].forEach((cell) => {
    cell.style.width = size + "px";
    cell.style.height = size + "px";
  });
}

function enableCells() {
  [].forEach.call(cells, (cell) => {
    cell.classList.add("selectableCell");
  });
}

function clearCells() {
  [].forEach.call(cells, (cell) => {
    cell.classList.remove("x", "o");
    cell.style.backgroundColor = "transparent";
  });
}

function disableCells() {
  [...cells].forEach((cell) => {
    cell.classList.remove("selectableCell");
  });
}
