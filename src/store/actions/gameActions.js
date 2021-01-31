import { CHECK_CELL, SET_WINNER_PATTERN, FINISH_GAME } from './index';
export const checkCell = ({ board }) => {
    return {
        type: CHECK_CELL,
        board
    };
};

export const finishGame = () => {
    return {
        type: FINISH_GAME
    };
};
export const setWinnerPattern = ({ winner, winnerPattern }) => {
    return {
        type: SET_WINNER_PATTERN,
        winner,
        winnerPattern
    };
};
