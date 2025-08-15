import arbiter from "../../arbiter/arbiter";
import { useAppContext } from "../../contexts/Context";
import { generateCandidates } from "../../reducer/actions/move";

const Piece = ({ rank, file, piece }) => {
    const { appState, dispatch } = useAppContext();
    const { turn, castleDirection, position: currentPosition } = appState;
    const isLatestPosition = appState.currentPositionIndex === appState.position.length - 1;

    const onDragStart = (e) => {
        if (!isLatestPosition) return;
        const img = new window.Image();
        img.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLz4=";
        e.dataTransfer.setDragImage(img, 0, 0);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
        setTimeout(() => {
            e.target.style.display = "none";
        }, 0);

        if (turn === piece[0]) {
            const candidateMoves = arbiter.getValidMoves({
                position: currentPosition[currentPosition.length - 1],
                prevPosition: currentPosition[currentPosition.length - 2],
                castleDirection: castleDirection[turn],
                piece,
                file: appState.isFlipped ? 7 - file : file,
                rank: appState.isFlipped ? 7 - rank : rank,
            });

            dispatch(generateCandidates({ candidateMoves }));
        }
    };
    const onDragEnd = (e) => {
        if (!isLatestPosition) return;
        e.target.style.display = "block";
    };

    return (
        <div
            className={`piece ${piece} p-${file}${rank}`} // file first, then rank
            draggable={isLatestPosition}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        />
    );
};

export default Piece;
