import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context';
import { incrementLineIdx, variationPopupClose } from '@/reducer/actions/lines'; // adjust path if different
import './VariationEnds.css';

const VariationEnds = ({ onClosePopup }) => {
    const { appState: { status }, dispatch } = useAppContext();

    if (status !== Status.variationEnds) {
        return null;
    }

    const handleNext = () => {
        dispatch(incrementLineIdx());
        onClosePopup();
    };

    return (
        <div className="popup--inner popup--inner__center">
            <h1>Variation Complete</h1>
            <p>You’ve reached the end of this variation.</p>
            <button onClick={handleNext}>Next Variation</button>
        </div>
    );
};

export default VariationEnds;

