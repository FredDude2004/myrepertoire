import '../DrillEnds/DrillEnds.css';
import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context';
import { useRouter } from "next/navigation";
import { drillPopupClose, setLines } from '@/reducer/actions/lines';
import { getLines } from '@/lib/api/lines';

const ThreeStrikes = ({ onClosePopup }) => {
    const { appState: { user, status }, dispatch } = useAppContext();
    const router = useRouter();

    if (status !== Status.threeStrikes) {
        return null;
    }

    const handleBack = async () => {
        dispatch(drillPopupClose(user.username, user.password));
        const lines = await getLines();
        dispatch(setLines(lines));
        router.push("/repertoire");
    };

    return (
        <div className="popup--inner popup--inner__center">
            <p>You're Garbage, Get Guud Kid</p>
            <button onClick={handleBack}>Back to Repertoire</button>
        </div>
    );
};

export default ThreeStrikes;
