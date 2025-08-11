import { createPosition } from './lib/helper'

// A function to create the initial state for the game board
export const resetBoard = () => ({
    position: [createPosition()],
    currentPositionIndex: 0,
    currentMoveIndex: 0,
    turn: 'w',
    candidateMoves: [],
    movesList: [],
    strikeCount: 0,
    moveNum: 1,
    promotionSquare: null,
    status: Status.ongoing,
    castleDirection: {
        w: 'both',
        b: 'both'
    },
    castleDirectionHistory: [],
});

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
    ...resetBoard(),

    // Quiz State
    user: null,

    userLines: [],
    selectedLinesIdxs: [],

    selectedLines: [],
    selectedIdx: 0,


    currentColor: "",
    currentLine: [],
    currentIdx: 0,

    currentVariation: [],
    variationIdx: 0,
}
