import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkCell, setWinnerPattern, finishGame } from '../store/actions/gameActions';
import BoardComponent from '../components/BoardComponent';
const mapStateToProps = (state) => ({
    winnerPattern: state.game.winnerPattern,
    winningPatterns: state.game.winningPatterns,
    boardState: state.game.boardState,
    xTurn: state.game.xTurn,
    gameOver: state.game.gameOver,
    winner: state.game.winner
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            checkCell: checkCell,
            setWinnerPattern: setWinnerPattern,
            finishGame: finishGame
        },
        dispatch
    );
};
class BoardContainer extends Component {
    constructor(props) {
        super(props);
        this.getPlayerMoves = this.getPlayerMoves.bind(this);
        this.checkCell = this.checkCell.bind(this);
        this.isCellEmpty = this.isCellEmpty.bind(this);
        this.checkForWin = this.checkForWin.bind(this);
    }
    isCellEmpty(cellId) {
        return this.props.boardState[cellId] === null;
    }
    getPlayerMoves(board, player) {
        return board
            .map((cell) => cell === player)
            .reduce((out, bool, index) => (bool ? out.concat(index) : out), []);
    }
    checkForWin(board, player) {
        const moves = this.getPlayerMoves(board, player);
        if (moves.length >= 3) {
            this.props.winningPatterns.forEach((pattern) => {
                const victory = pattern.every((cell) => moves.includes(cell));
                if (victory) {
                    this.props.setWinnerPattern({
                        winnerPattern: pattern,
                        winner: player
                    });
                    this.props.finishGame();
                }
            });
        }
    }
    checkCell(cellId) {
        if (this.isCellEmpty(cellId) && !this.props.gameOver) {
            const board = this.props.boardState;
            board[cellId] = this.props.xTurn ? 'X' : 'O';
            this.props.checkCell({ board });
            this.checkForWin(board, board[cellId]);
        }
    }
    render() {
        return (
            <div>
                <span>
                    {' '}
                    {this.props.gameOver
                        ? `${this.props.winner} is Winner`
                        : this.props.xTurn
                        ? "its X's Turn"
                        : "its O's Turn"}
                </span>
                <BoardComponent
                    checkCell={(cellId) => {
                        this.checkCell(cellId);
                    }}
                    board={{ ...this.props }}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(BoardContainer);
