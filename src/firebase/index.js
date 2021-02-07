import firebaseConfig from './firebaseConfig';
import app from 'firebase/app';
import 'firebase/database';
import React from 'react';
import 'firebase/database';
const FirebaseContext = React.createContext();
export { FirebaseContext };
class Firebase extends React.Component {
    constructor(props) {
        super(props);
        this.getBoardState = this.getBoardState.bind(this);
        this.setBoardState = this.setBoardState.bind(this);
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.state = {
            firebase: {
                app: app,
                database: app.database(),
                api: {
                    setBoardState: this.setBoardState,
                    getBoardState: this.getBoardState
                }
            }
        };
    }

    setBoardState(board) {
        this.state.firebase.database
            .ref('boards')
            .push()
            .set({
                board
            })
            .then((doc) => {
                console.log(`success`, doc);
            })
            .catch((error) => {
                console.error('error', error);
            });
    }
    getBoardState() {
        this.state.firebase.database.ref('boards').on('value', (snapshot) => {
            const vals = snapshot.val();
            let _records = [];
            for (var key in vals) {
                _records.push({
                    ...vals[key],
                    id: key
                });
            }
            console.log('read', _records);
        });
    }
    render() {
        const context = this.state.firebase;

        return (
            <FirebaseContext.Provider value={context}>
                {this.props.children}
            </FirebaseContext.Provider>
        );
    }
}
export default Firebase;
