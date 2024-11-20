// Gameboard module
const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const reset = () => board.fill("");

    const update = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const [a, b, c] of winPatterns) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes("") ? null : "tie";
    };

    const getEmptyCells = () =>
        board.map((cell, index) => (cell === "" ? index : null)).filter((i) => i !== null);

    const simulateMove = (index, mark) => {
        const newBoard = [...board];
        newBoard[index] = mark;
        return newBoard;
    };

    return { board, reset, update, checkWin, getEmptyCells, simulateMove };
})();

// Player factory
const Player = (name, mark) => ({ name, mark });

// Game controller module
const GameController = (function () {
    let currentPlayer = null;
    let gameOver = false;

    const startGame = () => {
        Gameboard.reset();
        currentPlayer = Player("Player 1", "X");
        gameOver = false;
        renderGameBoard();
        updateTurnInfo();
        updateProbabilities();
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer.mark === "X" ? Player("Player 2", "O") : Player("Player 1", "X");
        updateTurnInfo();
    };

    const handleMove = (index) => {
        if (!gameOver && Gameboard.update(index, currentPlayer.mark)) {
            const winner = Gameboard.checkWin();
            if (winner) {
                gameOver = true;
                showWinner(winner);
            } else {
                togglePlayer();
                updateProbabilities();
            }
            renderGameBoard();
        }
    };

    const showWinner = (winner) => {
        const message = winner === "tie" ? "It's a tie!" : `${winner} wins!`;
        document.getElementById("turn-info").innerText = message;
    };

    const updateTurnInfo = () => {
        document.getElementById("turn-info").innerText = `${currentPlayer.name}'s turn`;
    };

    const renderGameBoard = () => {
        const boardContainer = document.getElementById("game-board");
        boardContainer.innerHTML = "";
        Gameboard.board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell;
            cellElement.addEventListener("click", () => handleMove(index));
            boardContainer.appendChild(cellElement);
        });
    };

    const updateProbabilities = () => {
        const probabilities = calculateProbabilities(Gameboard.board, currentPlayer.mark);
        document.getElementById("win-x").innerText = `Win X: ${probabilities.winX}%`;
        document.getElementById("win-o").innerText = `Win O: ${probabilities.winO}%`;
        document.getElementById("draw").innerText = `Draw: ${probabilities.draw}%`;
    };

    return { startGame };
})();

// Probability calculations
const calculateProbabilities = (board, mark) => {
    const simulateGame = (board, mark) => {
        const opponentMark = mark === "X" ? "O" : "X";
        const emptyCells = board.map((cell, index) => (cell === "" ? index : null)).filter((i) => i !== null);

        const checkWin = () => {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (const [a, b, c] of winPatterns) {
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }
            return board.includes("") ? null : "tie";
        };

        const result = checkWin();
        if (result === "X") return { X: 1, O: 0, draw: 0 };
        if (result === "O") return { X: 0, O: 1, draw: 0 };
        if (result === "tie") return { X: 0, O: 0, draw: 1 };

        let totals = { X: 0, O: 0, draw: 0 };
        for (const index of emptyCells) {
            const newBoard = [...board];
            newBoard[index] = mark;
            const subResults = simulateGame(newBoard, opponentMark);
            totals.X += subResults.X;
            totals.O += subResults.O;
            totals.draw += subResults.draw;
        }
        return totals;
    };

    const outcomes = simulateGame(board, mark);
    const total = outcomes.X + outcomes.O + outcomes.draw;

    return {
        winX: ((outcomes.X / total) * 100).toFixed(1),
        winO: ((outcomes.O / total) * 100).toFixed(1),
        draw: ((outcomes.draw / total) * 100).toFixed(1),
    };
};

// DOM interactions
document.getElementById("restart-btn").addEventListener("click", GameController.startGame);
GameController.startGame();
