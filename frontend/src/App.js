import './App.css';
import Board from './components/Board/Board';
import { reducer } from './reducer/reducer'
import { useReducer } from 'react'
import { initGameState } from './constants';
import AppContext from './contexts/Context'
import Control from './components/Control/Control';
// import DrillStatus from './components/Control/bits/DrillStatus';
import MovesList from './components/Control/bits/MovesList';
import FirstMove from './components/Control/bits/FirstMove';
import PreviousMove from './components/Control/bits/PreviousMove';
import NextMove from './components/Control/bits/NextMove';
import CurrentMove from './components/Control/bits/CurrentMove';

function App() {

    const [appState, dispatch] = useReducer(reducer, initGameState);

    const providerState = {
        appState,
        dispatch
    }

    return (
        <AppContext.Provider value={providerState} >
            <div className="App">
                <Board />
                <Control>
                    {/* <DrillStatus /> */}
                    <MovesList />
                    <div className="move-controls">
                        <FirstMove />
                        <PreviousMove />
                        <NextMove />
                        <CurrentMove />
                    </div>
                </Control>
            </div >
        </AppContext.Provider >
    );
}

export default App;
