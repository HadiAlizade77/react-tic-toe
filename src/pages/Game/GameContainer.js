import React from 'react';
import BoardContainer from '../../containers/BoardContainer';

const Game = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>TIC TAC TOE :)</h1>
            <BoardContainer />
        </div>
    );
};
export default Game;
