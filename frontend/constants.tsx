import { createPosition } from './lib/helper'

// A function to create the initial state for the game board
export const resetBoard = (initialPosition: string[][]) => ({
    position: [initialPosition],
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
    'variationEnds': 'Finished variation',
    'lineEnds': 'Finished line',
    'drillEnds': 'Drill ends',
}

export const initAppState = {
    ...resetBoard(createPosition()),

    // Quiz State
    user: null,

    userLines: [],
    selectedLinesIdxs: [],

    selectedLines: [],
    selectedIdx: 0,
    lastSelectedIdx: 0,

    currentColor: "",

    currentLine: [],
    currentIdx: 0,
    lastCurrentIdx: 0,

    currentVariation: [],
    variationIdx: 0,
    lastVariationIdx: 0
}
