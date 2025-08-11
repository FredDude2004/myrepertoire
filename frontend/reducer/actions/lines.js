import { resetBoard } from '@/constants';
import actionTypes from '../actionTypes';

export const setLines = (lines) => {
    console.log("Dispatching setLines, lines:", lines);
    return {
        type: actionTypes.SET_LINES,
        payload: lines
    }
}

export const toggleSelectedLineIdx = (idx) => {
    console.log("Dispatching toggleSelectedIdx");
    return {
        type: actionTypes.TOGGLE_SELECTED_LINE_IDX,
        payload: idx
    }
}

export const setSelectedLines = () => {
    console.log("Dispatching setSelectedLines");
    return {
        type: actionTypes.SET_SELECTED_LINES
    }
}

export const incrementSelectedIdx = () => {
    console.log("Dispatching incrementSelectedIdx");
    return {
        type: actionTypes.INCREMENT_SELECTED_IDX,
        payload: resetBoard()
    }
}

export const incrementLineIdx = () => {
    console.log("Dispatching incrementLineIdx");
    return {
        type: actionTypes.INCREMENT_LINE_IDX,
        payload: resetBoard()
    }
}

export const incrementVariationIdx = () => {
    console.log("Dispatching incrementVariationIdx");
    return {
        type: actionTypes.INCREMENT_VARIATION_IDX
    }
}


