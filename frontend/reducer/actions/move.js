import actionTypes from '../actionTypes';

export const makeNewMove = ({ newPosition, newMove }) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: { newPosition, newMove },
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

export const generateCandidates = ({ candidateMoves }) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: { candidateMoves }
    }
}

export const firstMove = () => {
    return {
        type: actionTypes.FIRST_MOVE,
    }
}

export const previousMove = () => {
    return {
        type: actionTypes.PREVIOUS_MOVE,
    }
}

export const nextMove = () => {
    return {
        type: actionTypes.NEXT_MOVE,
    }
}

export const currentMove = () => {
    return {
        type: actionTypes.CURRENT_MOVE,
    }
}

export const incrementStrikes = () => {
    return {
        type: actionTypes.INCREMENT_STRIKES,
    }
}
