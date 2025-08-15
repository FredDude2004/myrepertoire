import { createPosition } from './lib/helper'
import { getFirstMove } from './lib/firstMove';
import { firstMove } from './reducer/actions/move';

// A function to create the initial state for the game board

export const resetBoard = (playerColor: string, firstMoveNote?: string) => {
    let initialPosition = createPosition();
    let initialMovesList: string[] = [];

    if (playerColor === "Black" && firstMoveNote) {
        initialPosition = getFirstMove(firstMoveNote);
        initialMovesList.push(firstMoveNote);
    } else {
        initialPosition = createPosition();
    }

    const initialTurn = playerColor === "White" ? "w" : "b";

    return {
        position: [initialPosition],
        currentPositionIndex: 0,
        currentMoveIndex: 0,
        turn: initialTurn,
        candidateMoves: [],
        movesList: initialMovesList,
        strikeCount: 0,
        moveNum: 1,
        promotionSquare: null,
        castleDirection: {
            w: "both",
            b: "both"
        },
        castleDirectionHistory: [],
    };
};

export const Status = {
    'ongoing': 'Ongoing',
    'promoting': 'Promoting',
    'white': 'White wins',
    'black': 'Black wins',
    'stalemate': 'Game draws due to stalemate',
    'insufficient': 'Game draws due to insufficient material',
    'variationEnds': 'Finished with variation',
    'lineEnds': 'Finished with line',
    'drillEnds': 'Finished with drill'
}

export const initAppState = {
    ...resetBoard("w", ""),

    // Quiz State
    isFlipped: false,
    user: null,

    userLines: [],
    selectedLinesIdxs: [],
    status: Status.ongoing,

    selectedLines: [],
    selectedIdx: 0,

    currentColor: "",
    currentLine: [],
    currentIdx: 0,

    currentVariation: [],
    variationIdx: 0,
}
