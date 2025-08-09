'use client'

import React, { ReactNode, useReducer, useEffect } from 'react';
import { reducer } from '@/reducer/reducer';
import { initGameState } from '@/constants';
import AppContext from '@/contexts/Context';
import actionTypes from '@/reducer/actionTypes';
import { getLines } from '@/lib/api/lines'; // your getLines function

export function AppProvider({ children }: { children: ReactNode }) {
    const [appState, dispatch] = useReducer(reducer, initGameState);

    useEffect(() => {
        async function validateUserAndFetchLines() {
            try {
                // 1️⃣ Validate user session
                const res = await fetch('http://localhost:8080/validate', {
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Not authenticated');

                const data = await res.json();

                // Set the logged in user in state
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: { username: data.message.Username },
                });

                // 2️⃣ Now fetch their lines
                const lines = await getLines();
                dispatch({
                    type: actionTypes.SET_LINES,
                    payload: lines,
                });

            } catch (err) {
                dispatch({ type: actionTypes.LOGOUT });
            }
        }

        validateUserAndFetchLines();
    }, []);

    const providerState = { appState, dispatch };

    return (
        <AppContext.Provider value={providerState}>
            {children}
        </AppContext.Provider>
    );
}
