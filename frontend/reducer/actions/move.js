import actionTypes from '../actionTypes';

export const makeNewMove = ({ newPosition, newMove }) => {
    console.log("Dispatching makeNewMove");
    return {
        type: actionTypes.NEW_MOVE,
        payload: { newPosition, newMove },
    }
}

export const clearCandidates = () => {
    console.log("Dispatching clearCandidates");
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

export const generateCandidates = ({ candidateMoves }) => {
    console.log("Dispatching generateCandidates");
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: { candidateMoves }
    }
}

export const firstMove = () => {
    console.log("Dispatching makeNewMove");
    return {
        type: actionTypes.FIRST_MOVE,
    }
}

export const previousMove = () => {
    console.log("Dispatching previousMove");
    return {
        type: actionTypes.PREVIOUS_MOVE,
    }
}

export const nextMove = () => {
    console.log("Dispatching nextMove");
    return {
        type: actionTypes.NEXT_MOVE,
    }
}

export const currentMove = () => {
    console.log("Dispatching currentMove");
    return {
        type: actionTypes.CURRENT_MOVE,
    }
}

export const incrementStrikes = () => {
    console.log("Dispatching incrementStrikes");
    return {
        type: actionTypes.INCREMENT_STRIKES,
    }
}
