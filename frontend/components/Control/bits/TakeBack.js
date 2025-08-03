import { useAppContext } from '../../../contexts/Context'
import { previousMove } from '../../../reducer/actions/move';

const TakeBack = () => {

    const { dispatch } = useAppContext();

    return <div>
        <button onClick={() => dispatch(previousMove())}>Take Back</button>
    </div>
}

export default TakeBack
