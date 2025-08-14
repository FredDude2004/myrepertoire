import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context';
import { drillPopupClose, incrementSelectedIdx, linePopupClose } from '@/reducer/actions/lines';
import './LineEnds.css';

const LineEnds = ({ onClosePopup }) => {
    const { appState: { status }, dispatch } = useAppContext();

    if (status !== Status.lineEnds) {
        return null;
    }

    const handleNext = () => {
        dispatch(incrementSelectedIdx());
        // dispatch(linePopupClose());
    };

    return (
        <div className="popup--inner popup--inner__center">
            <h1>Line Complete</h1>
            <p>You’ve reached the end of this line.</p>
            <button onClick={handleNext}>Next Line</button>
        </div>
    );
};

export default LineEnds;
