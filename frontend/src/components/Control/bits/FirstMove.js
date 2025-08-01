import { useAppContext } from '../../../contexts/Context'
import { firstMove } from '../../../reducer/actions/move';
import "./FirstMove.css";

const FirstMove = () => {

    const { dispatch } = useAppContext();

    return <div>
        <button className="button" onClick={() => dispatch(firstMove())}>First Move</button>
    </div>
}

export default FirstMove
