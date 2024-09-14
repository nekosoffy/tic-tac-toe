const gameBoard = (function () {
    let board;

    const getBoard = () => board;

    const resetBoard = () => board = Array.from({ length: 3 }, () => Array(3).fill(null));

    const placeMark = (row, column) => {
        if (row < 1 || row > 3 || column < 1 || column > 3) {
            display.showLog("Invalid value!");
            return;
        }
        if (board[row-1][column-1] !== null) {
            display.showLog("Spot is already marked!");
            return;
        }
        const player = playerManager.getActivePlayer();
        display.showLog(`${player.name} marked row ${row} and column ${column}.`);
        board[row-1][column-1] = player.marker;
        playerManager.switchPlayerTurn();
        display.updateBoard();
        gameController.checkGameEnd();
    };

    return { placeMark, getBoard, resetBoard };
})();

const playerManager = (function () {
    const players = [
        {
            name: "Player 1",
            marker: "X",
            score: 0
        },
        {
            name: "Player 2",
            marker: "O",
            score: 0
        }
    ];

    const setPlayerNames = (name1, name2) => {
        players[0]["name"] = name1;
        players[1]["name"] = name2;
    }
    
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;
    const resetActivePlayer = () => activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getScore = (i) => players[i]["score"];
    const addScore = (i) => players[i]["score"]++;

    const resetScore = () => {
        players.forEach(player => player.score = 0);
    }

    const getPlayerName = (i) => players[i]["name"];

    return { switchPlayerTurn, getActivePlayer, 
        setPlayerNames, addScore, getScore, 
        resetScore, getPlayerName, resetActivePlayer };
})();

const gameController = (function () {

    const checkGameEnd = () => {
        let board = gameBoard.getBoard();

        const winPatterns = 
        [
        // Horizontal checks
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],

        // Vertical checks
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],

        //Diagonal checks
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
        ]

        const equality = (array1, array2) => {
            if (array1.length !== array2.length) {
                return false;
            }
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }
            return true;
        }

        const patternX = (element) => equality(element,["X", "X", "X"]);
        const patternO = (element) => equality(element,["O", "O", "O"]);

        const xWin = winPatterns.some(patternX);
        const oWin = winPatterns.some(patternO);
        
        const boardFull = () => board.every(row => !row.includes(null));
    
        if (xWin || oWin || boardFull()) {
            display.showLog("Round finished!");
    
            if (xWin) {
                display.showLog(`${playerManager.getPlayerName(0)} won!`);
                playerManager.addScore(0);
            } else if (oWin) {
                display.showLog(`${playerManager.getPlayerName(1)} won!`);
                playerManager.addScore(1);
            } else if (boardFull()) {
                display.showLog(`It's a tie!`);  
            }
        display.showScore();
        gameOn = false;
        display.playAgainButton.style.display = "block";
        }
    }

    const playRound = () => {
        display.score.style.display = "block";
        display.p.style.display = "block";
        display.restartButton.style.display = "block";
        display.p.textContent = "Round started.";
        gameOn = true;
        display.showScore();
        gameBoard.resetBoard();
        display.updateBoard();
        playerManager.resetActivePlayer();
    }

    const resetGame = () => {
        gameOn = false;
        gameBoard.resetBoard();
        playerManager.resetScore();
        playerManager.setPlayerNames("Player 1", "Player 2");
    }

    let gameOn = false;
    const getGameOn = () => gameOn;

    return { checkGameEnd, playRound, getGameOn, resetGame };
})();

const display = (function() {

    const grid = document.querySelector("#grid");
    const startButton = document.querySelector("#start-game");
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input");
    const playAgainButton = document.querySelector("#play-again");
    const wrapper = document.querySelectorAll(".button-wrapper");
    const restartButton = document.querySelector("#restart-game");
    const pOneTitle = document.querySelector("#player-one-title");
    const pTwoTitle = document.querySelector("#player-two-title");
    const pOneScore = document.querySelector("#player-one-score");
    const pTwoScore = document.querySelector("#player-two-score");
    const score = document.querySelector("#score-wrapper");
    const p = document.querySelector("p");

    const updateBoard = () => {
        showGrid();
        grid.replaceChildren();
        const board = gameBoard.getBoard();

        board.forEach((array, i) => {
            for (let j = 0; j < 3; j++) {
                const element = array[j];
                const div = document.createElement("div");
                div.classList.add("cell");
                div.setAttribute("data-row", i);
                div.setAttribute("data-column", j);
                if (element === "X") {
                    div.classList.add("cross");
                } else if (element === "O") {
                    div.classList.add("circle");
                }
                grid.appendChild(div);
            }
        });
    }

    const handleCellClick = (event) => {
        if (gameController.getGameOn() === true) {
            const cell = event.target;
            const row = parseInt((cell.dataset.row)) + 1;
            const column = parseInt((cell.dataset.column)) + 1;
            if (cell.classList.contains("cell")) {
                gameBoard.placeMark(row, column);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValues = Array.from(inputs).map(input => input.value);
        playerManager.setPlayerNames(inputValues[0],inputValues[1]);
        dialog.close();
        form.reset();
        startButton.style.display = "none";
        gridOn = true;
        showGrid();
        gameController.playRound();
    }

    let gridOn = false;

    const showGrid = () => {
        grid.style.display = gridOn ? "grid" : "none";
    };

    const handleButtonClick = (event) => {
        button = event.target;
        if (button.matches("#start-game")) {
            dialog.showModal()
        }
        if (button.matches("#play-again")) {
            gameController.playRound();
            playAgainButton.style.display = "none";
        }
        if (button.matches("#cancel")) {
            dialog.close();
            form.reset();
        }
        if (button.matches("#restart-game")) {
            gridOn = false;
            showGrid();
            gameController.resetGame();
            startButton.style.display = "block";
            restartButton.style.display = "none";
            playAgainButton.style.display = "none";
            score.style.display = "none";
            p.style.display = "none";
            p.replaceChildren();
        }
    }

    const showScore = () => {
        pOneTitle.textContent = `${playerManager.getPlayerName(0)}: `;
        pTwoTitle.textContent = `${playerManager.getPlayerName(1)}: `;
        pOneScore.textContent = `${playerManager.getScore(0)}`;
        pTwoScore.textContent = `${playerManager.getScore(1)}`;
    }

    const showLog = (text) => {
        p.replaceChildren();
        p.textContent = text;
    }

    wrapper.forEach(button => button.addEventListener("click", handleButtonClick));
    grid.addEventListener("click", handleCellClick);
    form.addEventListener("submit", handleSubmit);

    return { updateBoard, playAgainButton, p, 
        restartButton, showScore, score, showLog };
})();

gameBoard.resetBoard();
display.updateBoard();