import actionTypes from '../actionTypes';

export const login = (username, password) => {
    return {
        type: actionTypes.LOGIN,
        payload: { username, password },
    }
}

export const logout = (username, password, token) => {
    return {
        type: actionTypes.LOGIN,
        payload: { username, password, token },
    }
}

