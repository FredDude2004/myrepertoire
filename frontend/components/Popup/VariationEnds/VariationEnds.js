import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context'
import { nextVariation } from '../../../reducer/actions/lines';
import '../GameEnds/GameEnds.css'
import { createPosition } from './lib/helper'

const VariationEnds = ({ onClosePopup }) => {

    const { appState: { status }, dispatch } = useAppContext();

    if (status === Status.ongoing || status === Status.promoting)
        return null

    const next = () => {
        dispatch(nextVariation(createPosition()))
    }

    return (
        <div className="popup--inner popup--inner__center">
            <h1>Good Job!</h1>
            <button onClick={next}>Next Variation</button>
        </div>
    )

}

export default VariationEnds;
