const moves = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1]
];

const boardSize = 8;

function createChessboard() {
  const chessboard = document.getElementById("chessboard");
  const rowNumbers = document.querySelector(".row-numbers");
  const colNumbers = document.querySelector(".col-numbers");

  chessboard.innerHTML = "";
  rowNumbers.innerHTML = "";
  colNumbers.innerHTML = "";

  // Populate row numbers
  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("div");
    row.textContent = i;
    rowNumbers.appendChild(row);
  }

  // Populate column numbers
  for (let i = 0; i < boardSize; i++) {
    const col = document.createElement("div");
    col.textContent = i;
    colNumbers.appendChild(col);
  }

  // Create chessboard squares
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const square = document.createElement("div");
      square.dataset.row = row;
      square.dataset.col = col;
      square.className = (row + col) % 2 === 0 ? "white" : "black";
      chessboard.appendChild(square);
    }
  }
}

function isValidPosition([x, y]) {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

function findShortestPath(start, end) {
  const queue = [{ position: start, path: [start] }];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length) {
    const { position, path } = queue.shift();
    if (position[0] === end[0] && position[1] === end[1]) return path;

    for (const [dx, dy] of moves) {
      const nextPos = [position[0] + dx, position[1] + dy];
      if (isValidPosition(nextPos) && !visited.has(nextPos.toString())) {
        queue.push({ position: nextPos, path: [...path, nextPos] });
        visited.add(nextPos.toString());
      }
    }
  }
  return [];
}

function highlightPath(path) {
  const cells = document.querySelectorAll(".grid div");
  cells.forEach(cell => cell.classList.remove("path", "start", "end"));
  path.forEach(([x, y], index) => {
    const cell = document.querySelector(`[data-row='${x}'][data-col='${y}']`);
    if (index === 0) {
      cell.classList.add("start");
    } else if (index === path.length - 1) {
      cell.classList.add("end");
    } else {
      cell.classList.add("path");
      cell.textContent = index;
    }
  });
}

function findKnightPath() {
  const startInput = document.getElementById("start").value.split(",").map(Number);
  const endInput = document.getElementById("end").value.split(",").map(Number);

  if (!isValidPosition(startInput) || !isValidPosition(endInput)) {
    document.getElementById("output").textContent = "Invalid input! Please enter valid indices.";
    return;
  }

  const path = findShortestPath(startInput, endInput);
  highlightPath(path);

  document.getElementById("output").innerText = `Start: ${startInput}, End: ${endInput}\nPath: ${JSON.stringify(path)}`;
}

createChessboard();
