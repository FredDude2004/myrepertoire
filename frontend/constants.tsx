import { createPosition } from './lib/helper'

interface Move {
    moveNo: number;
    white: string;
    black: string;
}

interface Line {
    ID: number;
    Name: string;
    Color: string;
    OriginalPGN: string;
    ParsedPGN: Move[];
    UserID: number;
}

// interface User {
//     username: string;
//     password: string;
// }

const tempMove: Move[] = [{ moveNo: 1, white: "e4", black: "e5" }];
const tempLine: Line = {
    ID: 2,
    Name: "Kings Pawn",
    Color: "white",
    OriginalPGN: "1. e4 e5",
    ParsedPGN: tempMove,
    UserID: 1
};

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
    userLines: [tempLine],
    userLineIndexes: [],
}
