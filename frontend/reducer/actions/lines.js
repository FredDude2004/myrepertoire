import { resetBoard } from '@/constants';
import actionTypes from '../actionTypes';

export const setLines = (lines) => {
    return {
        type: actionTypes.SET_LINES,
        payload: lines
    }
}

export const toggleSelectedLineIdx = (idx) => {
    return {
        type: actionTypes.TOGGLE_SELECTED_LINE_IDX,
        payload: idx
    }
}

export const setSelectedLines = () => {
    return {
        type: actionTypes.SET_SELECTED_LINES
    }
}

export const incrementSelectedIdx = () => {
    return {
        type: actionTypes.INCREMENT_SELECTED_IDX
    }
}

export const setCurrentLine = () => {
    return {
        type: actionTypes.SET_CURRENT_LINE
    }
}

export const incrementLineIdx = () => {
    return {
        type: actionTypes.INCREMENT_LINE_IDX
    }
}

export const setCurrentVariation = () => {
    return {
        type: actionTypes.SET_CURRENT_VARIATION
    }
}

export const incrementVariationIdx = () => {
    return {
        type: actionTypes.INCREMENT_VARIATION_IDX
    }
}

export const nextVariation = (newBoard) => {
    return {
        type: actionTypes.NEXT_VARIATION,
        payload: newBoard
    }
}

export const nextLine = (newBoard) => {
    return {
        type: actionTypes.NEXT_LINE,
        payload: newBoard
    }
}

