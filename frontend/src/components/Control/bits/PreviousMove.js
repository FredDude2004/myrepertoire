import { useAppContext } from '../../../contexts/Context'
import { previousMove } from '../../../reducer/actions/move';
import './PreviousMove.css'

const PreviousMove = () => {

    const { dispatch } = useAppContext();

    return <div>
        <button className="button" onClick={() => dispatch(previousMove())}>Previous Move</button>
    </div>
}

export default PreviousMove
