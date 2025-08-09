import { createPosition } from './lib/helper'

export const Status = {
    'ongoing': 'Ongoing',
    'promoting': 'Promoting',
    'white': 'White wins',
    'black': 'Black wins',
    'stalemate': 'Game draws due to stalemate',
    'insufficient': 'Game draws due to insufficient material',
}

export const initGameState = {
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

    // Quiz State
    user: null,
    userLines: [],
    userLineIdxs: [],

    selectedLines: [],
    currentLine: [],
    selectedLinesIdx: 0,
}
