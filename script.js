const gameBoard = (function () {
    const boardSide = 3;
    const board = Array.from({ length: boardSide }, () => Array(boardSide).fill(null));

    return { board };

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