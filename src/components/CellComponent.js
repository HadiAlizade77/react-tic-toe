import React from 'react';
const CellComponent = (props) => {
    const checkCell = () => {
        props.checkCell(props.cellId);
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
            style={{ width: '100%', height: '100%', display: 'flex' }}>
            <span style={{ margin: 'auto' }}>{props.cellId}</span>
        </div>
    );
};
export default CellComponent;
