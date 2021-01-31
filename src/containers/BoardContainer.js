import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkCell } from '../store/actions/gameActions';
import BoardComponent from '../components/BoardComponent';
const mapStateToProps = (state) => ({
    winnerPattern: state.game.winnerPattern,
    boardState: state.game.boardState
});
const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            checkCell: checkCell
        },
        dispatch
    );
};
class BoardContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const board = this.props.boardState;
        return (
            <BoardComponent
                checkCell={(x) => {
                    console.log(x);
                }}
                board={board}
            />
        );
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(BoardContainer);
