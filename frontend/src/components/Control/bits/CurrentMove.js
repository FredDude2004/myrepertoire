import { useAppContext } from '../../../contexts/Context'
import { currentMove } from '../../../reducer/actions/move';

const CurrentMove = () => {

    const { dispatch } = useAppContext();

    return <button className="button" onClick={() => dispatch(currentMove())}>&gt;&gt;</button>
}

export default CurrentMove
