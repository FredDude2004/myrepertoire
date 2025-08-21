import { initAppState, resetBoard } from '@/constants';
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
        type: actionTypes.INCREMENT_SELECTED_IDX,
        payload: resetBoard()
    }
}

export const incrementLineIdx = () => {
    return {
        type: actionTypes.INCREMENT_LINE_IDX,
        payload: resetBoard()
    }
}

export const incrementVariationIdx = () => {
    return {
        type: actionTypes.INCREMENT_VARIATION_IDX
    }
}

export const drillPopupClose = (username, password) => {
    return {
        type: actionTypes.DRILL_POPUP_CLOSE,
        payload: { initAppState, username, password }
    }
}

export const linePopupClose = () => {
    return {
        type: actionTypes.LINE_POPUP_CLOSE
    }
}

export const variationPopupClose = () => {
    return {
        type: actionTypes.VARIATION_POPUP_CLOSE
    }
}
