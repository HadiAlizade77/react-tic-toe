import { CHECK_CELL } from '../actions';

const initialState = {
    winningPatterns: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    winnerPattern: null,
    winner: null,
    boardState: Array(9).fill(null),
    xTurn: true,
    gameOver: false,
    moves: 0
};

const isCellEmpty = (state, boardId) => {
    return state.boardState[boardId] === null;
};
const getPlayerMoves = (boardState, player) => {
    return boardState
        .map((cell) => cell === player)
        .reduce((out, bool, index) => (bool ? out.concat(index) : out), []);
};
const checkForWin = (state, player) => {
    const moves = getPlayerMoves(state, player);
    let winnerPattern = null;
    if (moves.length >= 3) {
        state.winningPatterns.some((pattern) => {
            const winning = moves.every((move) => {
                return pattern.includes(move);
            });
            if (winning) {
                winnerPattern = pattern;
            }
            return winning;
        });
    }
    return winnerPattern;
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHECK_CELL: {
            if (isCellEmpty(state, action.payload)) {
                const player = state.xTurn ? 'x' : 'o';
                state.boardState[action.payload] = player;
                state.xTurn = !state.xTurn;
                state.moves++;
                const win =
                    checkForWin(state, player) !== null ? checkForWin(state, player) : false;
                if (win !== false) {
                    state.gameOver = true;
                    state.winnerPattern = win;
                }
            }
            break;
        }
        default:
            return state;
    }
}
