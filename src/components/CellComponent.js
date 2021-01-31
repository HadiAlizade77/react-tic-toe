import React from 'react';

const CellComponent = (props) => {
    const checkCell = () => {
        props.checkCell(props.cellId);
    };
    const isCellEmpty = () => {
        return cellPlayer === null;
    };
    const cellPlayer = () => {
        return props.board[props.cellId];
    };
    const getBgColor = () => {
        if (props.game.gameOver) {
            if (props.game.winnerPattern.includes(props.cellId)) {
                return 'green';
            }
        } else {
            if (!isCellEmpty()) {
                return cellPlayer() === 'X' ? 'blue' : cellPlayer() === 'O' ? 'red' : 'white';
            }
        }
        return 'white';
    };
    return (
        <div
            tabIndex="0"
            role="button"
            onKeyDown={() => {
                checkCell();
            }}
            onClick={() => {
                checkCell();
            }}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: getBgColor()
            }}>
            <span style={{ margin: 'auto' }}>{props.board[props.cellId]}</span>
        </div>
    );
};
export default CellComponent;
