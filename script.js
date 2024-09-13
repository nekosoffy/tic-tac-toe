const gameBoard = (function () {
    let board;

    const getBoard = () => board;

    const resetBoard = () => board = Array.from({ length: 3 }, () => Array(3).fill(null));

    const placeMark = (row, column) => {
        if (row < 1 || row > 3 || column < 1 || column > 3) {
            console.log("Invalid value!");
            return;
        }
        if (board[row-1][column-1] !== null) {
            console.log("Spot is already marked!");
            return;
        }
        const player = playerManager.getActivePlayer();
        console.log(`${player.name} marked row ${row} and column ${column}...`)
        board[row-1][column-1] = player.marker;
        playerManager.switchPlayerTurn();
        return getBoard();
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
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const getScore = (i) => players[i]["score"];
    const addScore = (i) => players[i]["score"]++;

    return { switchPlayerTurn, getActivePlayer, 
        setPlayerNames, addScore, getScore };
})();