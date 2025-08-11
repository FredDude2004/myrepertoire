import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context'
import { incrementLineIdx } from '../../../reducer/actions/lines';
import '../VariationEnds/VariationEnds.css'

const VariationEnds = ({ onClosePopup }) => {

    const { appState: { status }, dispatch } = useAppContext();

    if (status === Status.ongoing || status === Status.promoting ||
        status === Status.lineEnds || status === Status.drillEnds ||
        status === Status.white || status === Status.black ||
        status === Status.stalemate || status === Status.insufficient) {
        return null
    }

    const next = () => {
        dispatch(incrementLineIdx());
    }

    return (
        <div className="popup--inner popup--inner__center">
            <h1>Good Job!</h1>
            <button onClick={next}>Next Variation</button>
        </div>
    )

}

export default VariationEnds;
