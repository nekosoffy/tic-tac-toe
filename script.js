const gameBoard = (function () {
    const boardSide = 3;
    const board = Array.from({ length: boardSide }, () => Array(boardSide).fill(null));

    const getBoard = () => board;

    const placeMark = (row, column) => {
        if (row < 1 || row > 3 || column < 1 || column > 3) {
            console.log("Invalid value!");
            return;
        }
        if (board[row-1][column-1] !== null) {
            console.log("Spot is already marked!");
            return;
        }
        board[row-1][column-1] = playerManager.getActivePlayer().marker;
        return board;
    };

    return { placeMark, getBoard };

})();

const playerManager = (function () {

    const players = [
        {
            name: null,
            marker: "X",
            score: 0
        },
        {
            name: null,
            marker: "O",
            score: 0
        }
    ];

    const getPlayerNames = (name1, name2) => {
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
        getPlayerNames, addScore, getScore };

})();