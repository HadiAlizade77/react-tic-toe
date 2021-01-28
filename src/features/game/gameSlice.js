import { createSlice } from '@reduxjs/toolkit';
const helpers = {
    isCellEmpty: (state, boardId) => {
        return state.boardState[boardId] === null;
    },
    getPlayerMoves: (state, player) => {
        return state.boardState
            .map((box) => box === player)
            .reduce((out, bool, index) => (bool ? out.concat(index) : out), []);
    },
    checkForWin: (state, player) => {
        const moves = helpers.getPlayerMoves(state, player);
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
    }
};
export const gameSlice = createSlice({
    name: 'board',
    initialState: {
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
    },
    reducers: {
        checkCell: (state, action) => {
            if (helpers.isCellEmpty(state, action.payload)) {
                const player = state.xTurn ? 'x' : 'o';
                state.boardState[action.payload] = player;
                state.xTurn = !state.xTurn;
                state.moves++;
                const win =
                    helpers.checkForWin(state, player) !== null
                        ? helpers.checkForWin(state, player)
                        : false;
                if (win !== false) {
                    state.gameOver = true;
                    state.winnerPattern = win;
                }
            }
        }
    }
});

export const { setWinnerPattern, checkCell } = gameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const boardState = (state) => {
    return state.game.boardState;
};
export const winnerPattern = (state) => {
    return state.game.winnerPattern;
};

export default gameSlice.reducer;
