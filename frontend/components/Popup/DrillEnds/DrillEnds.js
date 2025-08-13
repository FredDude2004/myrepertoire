import './DrillEnds.css';
import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context';
import { useRouter } from "next/navigation";
import { drillPopupClose, setLines } from '@/reducer/actions/lines';
import { getLines } from '@/lib/api/lines';

const DrillEnds = ({ onClosePopup }) => {
    const { appState: { status }, dispatch } = useAppContext();
    const router = useRouter();

    if (status !== Status.drillEnds) {
        return null;
    }

    const handleBack = async () => {
        dispatch(drillPopupClose());
        const lines = await getLines();
        dispatch(setLines(lines));
        router.push("/repertoire");
    };

    return (
        <div className="popup--inner popup--inner__center">
            <h1>Drill Complete</h1>
            <p>All lines in this drill have been completed.</p>
            <button onClick={handleBack}>Back to Repertoire</button>
        </div>
    );
};

export default DrillEnds;
