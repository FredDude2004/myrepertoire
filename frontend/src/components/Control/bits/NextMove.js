import { useAppContext } from '../../../contexts/Context'
import { nextMove } from '../../../reducer/actions/move';
import './NextMove.css'

const NextMove = () => {

    const { dispatch } = useAppContext();

    return <div>
        <button className="button" onClick={() => dispatch(nextMove())}>Next Move</button>
    </div>
}

export default NextMove
