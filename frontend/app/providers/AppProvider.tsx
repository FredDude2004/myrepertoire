'use client'

import React, { ReactNode } from 'react';
import { useReducer } from 'react';
import { reducer } from '@/reducer/reducer';
import { initGameState } from '@/constants';
import AppContext from '@/contexts/Context';
import actionTypes from '@/reducer/actionTypes';

export function AppProvider({ children }: { children: ReactNode }) {
    const [appState, dispatch] = useReducer(reducer, initGameState);

    React.useEffect(() => {
        async function validateUser() {
            try {
                const res = await fetch('http://localhost:8080/validate', {
                    credentials: 'include', // send cookies
                });
                if (!res.ok) {
                    throw new Error('Not authenticated');
                }
                const data = await res.json();

                dispatch({
                    type: actionTypes.LOGIN,
                    payload: { username: data.message.Username }, // use relevant user fields
                });
            } catch (err) {
                dispatch({ type: actionTypes.LOGOUT });
            }
        }

        validateUser();
    }, []);

    const providerState = { appState, dispatch };

    return <AppContext.Provider value={providerState}>{children}</AppContext.Provider>;
}
