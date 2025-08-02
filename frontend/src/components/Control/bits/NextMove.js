import { useAppContext } from '../../../contexts/Context'
import { nextMove } from '../../../reducer/actions/move';

const NextMove = () => {

    const { dispatch } = useAppContext();

    return <button className="button" onClick={() => dispatch(nextMove())}>&gt;</button>
}

export default NextMove
