const gameBoard = (function () {
    const boardSide = 3;
    const board = Array.from({ length: boardSide }, () => Array(boardSide).fill(null));

    const getBoard = () => board;

    const placeMark = (row, column, player) => {
        board[row-1][column-1] = player.mark;
        return board;
    }

    return { placeMark, getBoard };

})();

const player = (function () {
    const create = (name, mark) => {
        return {
            playerName: name,
            mark: mark
        };
    };

    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return { create, getScore, addScore };

})();