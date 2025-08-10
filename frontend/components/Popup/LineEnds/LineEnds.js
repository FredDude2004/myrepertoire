import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context'
import { nextLine } from '../../../reducer/actions/lines';
import '../GameEnds/GameEnds.css'
import { createPosition } from './lib/helper'

const LineEnds = ({ onClosePopup }) => {

    const { appState: { status }, dispatch } = useAppContext();

    if (status === Status.ongoing || status === Status.promoting)
        return null

    const next = () => {
        dispatch(nextLine(createPosition()));
    }

    const isWin = status.endsWith('wins')

    return <div className="popup--inner popup--inner__center">
        <h1>{isWin ? status : 'Draw'}</h1>
        <p>{!isWin && status}</p>
        <div className={`${status}`} />
        <button onClick={next}>New Game</button>
    </div>

}

export default LineEnds;
