import { useAppContext } from '../../../contexts/Context'
import { previousMove } from '../../../reducer/actions/move';

const PreviousMove = () => {

    const { dispatch } = useAppContext();

    return <button className="button" onClick={() => dispatch(previousMove())}>&lt;</button>
}

export default PreviousMove
