import { useAppContext } from '../../../contexts/Context'
import { firstMove } from '../../../reducer/actions/move';

const FirstMove = () => {

    const { dispatch } = useAppContext();

    return <button className="button" onClick={() => dispatch(firstMove())}>&lt;&lt;</button>
}

export default FirstMove
