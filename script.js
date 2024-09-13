const gameBoard = (function () {
    const boardSide = 3;
    const board = Array.from({ length: boardSide }, () => Array(boardSide).fill(null));

    const getBoard = () => board;

    const placeMark = (row, column) => {
        board[row-1][column-1] = playerManager.players.marker;
        return board;
    }

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

    const getScore = (i) => players[i]["score"];
    const addScore = (i) => players[i]["score"]++;

    return { getPlayerNames, addScore, getScore, players };

})();