import { useAppContext } from '../../../contexts/Context'

const MovesList = ({ className = '' }: { className?: string }) => {
    const { appState: { movesList } } = useAppContext();

    return (
        <div className={`moves-list ${className}`}>
            {movesList.map((move: string, i: number) => (
                <div key={i} data-number={Math.floor(i / 2) + 1}>
                    {move}
                </div>
            ))}
        </div>
    );
};

export default MovesList;
