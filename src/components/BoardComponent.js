import React from 'react';
import Cell from './CellComponent';
import('../App.css');
const BoardComponent = (props) => {
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
            let cellId = rowIndex * 3 + col;
            let element = (
                <td key={'col-' + cellId} className={classNames.length ? classNames.join(' ') : ''}>
                    <Cell
                        checkCell={(cellId) => {
                            checkCell(cellId);
                        }}
                        cellId={cellId}
                        game={{ ...props.board }}
                        board={props.board.boardState}
                    />
                </td>
            );
            cols.push(element);
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
    const checkCell = (cellId) => {
        props.checkCell(cellId);
    };
    return (
        <div className="App">
            <table>
                <tbody>{getRows()}</tbody>
            </table>
        </div>
    );
};
export default BoardComponent;
