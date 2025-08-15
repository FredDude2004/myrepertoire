import { flipBoard } from '@/reducer/actions/game';
import { useAppContext } from '../../../contexts/Context'

const MovesList = ({ className = '' }: { className?: string }) => {
    const { appState: { movesList }, dispatch } = useAppContext();

    return (
        <div className={`moves-list ${className}`}>
            {movesList.map((move: string, i: number) => (
                <div key={i} data-number={Math.floor(i / 2) + 1}>
                    {move}
                </div>
            ))}


            <button onClick={() => dispatch(flipBoard())}>
                Flip Board
            </button>
        </div>
    );
};

export default MovesList;
