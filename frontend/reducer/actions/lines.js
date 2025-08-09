import actionTypes from '../actionTypes';

export const setLines = (lines) => {
    return {
        type: actionTypes.SET_LINES,
        payload: lines,
    }
}

export const toggleSelectedLineIdx = (idx) => ({
    type: actionTypes.TOGGLE_SELECTED_LINE_IDX,
    payload: idx,
});
