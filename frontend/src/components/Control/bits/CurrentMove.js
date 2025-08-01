import { useAppContext } from '../../../contexts/Context'
import { currentMove } from '../../../reducer/actions/move';
import './CurrentMove.css';

const CurrentMove = () => {

    const { dispatch } = useAppContext();

    return <div>
        <button className="button" onClick={() => dispatch(currentMove())}>Current Move</button>
    </div>
}

export default CurrentMove
