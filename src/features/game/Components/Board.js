import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { boardState, checkCell } from '../gameSlice';
import('./Board.css');
export function Board() {
    const board = useSelector(boardState);
    // const winnerPattern = useSelector(boardState);
    const dispatch = useDispatch();
    const getCellClassName = (colIndex, rowIndex) => {
        let classNames = [];
        if (colIndex === 1) {
            classNames.push('vertical');
        }
        if (rowIndex === 1) {
            classNames.push('horizontal');
        }
        return classNames;
    };
    const getColumns = (rowIndex) => {
        let cols = [];
        for (let col = 0; col < 3; col++) {
            let classNames = getCellClassName(col, rowIndex);
            let boardId = rowIndex * 3 + col;
            let elemet = (
                <td
                    role="gridcell"
                    key={'col-' + boardId}
                    onClick={() => {
                        handleMarking(boardId);
                    }}
                    style={
                        board[boardId] === 'o'
                            ? { backgroundColor: 'red' }
                            : board[boardId] === 'x'
                            ? { backgroundColor: 'blue' }
                            : {}
                    }
                    className={classNames.length ? classNames.join(' ') : ''}>
                    {board[boardId]}
                </td>
            );
            cols.push(elemet);
        }
        return cols;
    };
    const getRows = () => {
        let rows = [];
        for (let row = 0; row < 3; row++) {
            rows.push(<tr key={'row-' + row}>{getColumns(row)}</tr>);
        }
        return rows;
    };
    const handleMarking = (boardId) => {
        dispatch(checkCell(boardId));
    };
    return (
        <div className="App">
            <table>
                <tbody>{getRows()}</tbody>
            </table>
        </div>
    );
}
