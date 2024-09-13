const gameBoard = (function () {
    const boardSide = 3;
    const board = Array.from({ length: boardSide }, () => Array(boardSide).fill(null));

    const placeMark = (row, column, player) => {
        board[row-1][column-1] = player.mark;
        return board;
    }

    return { placeMark, board };

})();

const Player = (function () {
    const create = (name, mark) => {
        return {
            playerName: name,
            mark: mark
        };
    };

    return { create };

})();