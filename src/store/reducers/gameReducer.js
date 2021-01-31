import { CHECK_CELL, SET_WINNER_PATTERN, FINISH_GAME } from '../actions';

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

export default function (state = initialState, action) {
    switch (action.type) {
        case CHECK_CELL: {
            return {
                ...state,
                xTurn: !state.xTurn,
                boardState: action.board,
                moves: ++state.moves
            };
        }
        case SET_WINNER_PATTERN: {
            return {
                ...state,
                winner: action.winner,
                winnerPattern: action.winnerPattern
            };
        }
        case FINISH_GAME: {
            return {
                ...state,
                gameOver: true
            };
        }
        default:
            return state;
    }
}
