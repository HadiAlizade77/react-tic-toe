import React, { useContext } from 'react';
import BoardContainer from '../../containers/BoardContainer';
import { FirebaseContext } from '../../firebase';

const Game = () => {
    const context = useContext(FirebaseContext);
    context.api.getBoardState();
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>TIC TAC TOE :)</h1>
            <button
                onClick={() => {
                    console.log(context);
                    context.api.setBoardState('x');
                    // context.api.setBoardState('ss');
                }}>
                x
            </button>
            <BoardContainer />
        </div>
    );
};
export default Game;
