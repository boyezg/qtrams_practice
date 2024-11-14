// Gameboard module (IIFE pattern to ensure only one instance)
const Gameboard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""]; // Empty gameboard

    const reset = () => {
        board.fill(""); // Clear the board
    };

    const update = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winning mark ('X' or 'O')
            }
        }

        if (board.every(cell => cell !== "")) {
            return "tie"; // Return "tie" if the board is full and no winner
        }

        return null; // Game still ongoing
    };

    return {
        board,
        reset,
        update,
        checkWin
    };
})();

// Player factory
const Player = (name, mark) => {
    return { name, mark };
};

// Game controller module
const GameController = (function() {
    let currentPlayer = null;
    let gameOver = false;

    const startGame = () => {
        Gameboard.reset();
        currentPlayer = Player("Player 1", "X");
        gameOver = false;
        renderGameBoard();
        updateTurnInfo();
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
            cellElement.textContent = cell;
            cellElement.addEventListener("click", () => handleMove(index));
            boardContainer.appendChild(cellElement);
        });
    };

    return {
        startGame
    };
})();

// DOM interactions
document.getElementById("restart-btn").addEventListener("click", () => {
    GameController.startGame();
});

// Initialize the game
GameController.startGame();
