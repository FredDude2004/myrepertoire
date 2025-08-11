import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context'
import { incrementSelectedIdx, nextLine } from '../../../reducer/actions/lines';
import '../GameEnds/GameEnds.css'

const LineEnds = ({ onClosePopup }) => {

    const { appState: { status }, dispatch } = useAppContext();

    if (status === Status.ongoing || status === Status.promoting ||
        status === Status.variationEnds || status === Status.drillEnds ||
        status === Status.white || status === Status.black ||
        status === Status.stalemate || status === Status.insufficient) {
        return null
    }

    const next = () => {
        dispatch(incrementSelectedIdx());
    }

    return <div className="popup--inner popup--inner__center">
        <button onClick={next}>New Game</button>
    </div>

}

export default LineEnds;
