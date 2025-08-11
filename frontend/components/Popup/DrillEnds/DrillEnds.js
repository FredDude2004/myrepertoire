import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context'
import { setupNewGame } from '../../../reducer/actions/game';
import '../GameEnds/GameEnds.css'
import { useRouter } from "next/navigation";

const DrillEnds = ({ onClosePopup }) => {

    const { appState: { status }, dispatch } = useAppContext();
    const router = useRouter();

    if (status === Status.ongoing || status === Status.promoting ||
        status === Status.variationEnds || status === Status.lineEnds ||
        status === Status.white || status === Status.black ||
        status === Status.stalemate || status === Status.insufficient) {
        return null
    }

    const newGame = () => {
        dispatch(setupNewGame())
        router.push("/repertoire");
    }


    return <div className="popup--inner popup--inner__center">
        <h1>Well Done!</h1>
        <button onClick={newGame}>Back to Repertoire</button>
    </div>

}

export default DrillEnds;
