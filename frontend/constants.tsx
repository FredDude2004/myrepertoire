import { createPosition } from './lib/helper'
import { getFirstMove } from './lib/firstMove';
import { firstMove } from './reducer/actions/move';

// A function to create the initial state for the game board
type Color = "w" | "b";

export const resetBoard = (playerColor: Color, firstMoveNote?: string) => {
    console.log("resetBoard, playerColor:", playerColor, "firstMoveNote:", firstMoveNote);
    let initialPosition = createPosition();
    let initialMovesList: string[] = [];

    if (playerColor === "b" && firstMoveNote) {
        // Use the predefined first move if given
        initialPosition = getFirstMove(firstMoveNote);
        initialMovesList.push(firstMoveNote);
    } else {
        // Otherwise, use a standard starting position
        initialPosition = createPosition();
    }

    // If the player is black and the first move is for white, we might want to flip the turn
    const initialTurn = playerColor;
    console.log("initialTurn:", initialTurn);

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
