'use client'

import { ReactNode, useReducer, useEffect } from 'react';
import { reducer } from '@/reducer/reducer';
import { initAppState } from '@/constants';
import AppContext from '@/contexts/Context';
import actionTypes from '@/reducer/actionTypes';
import { getLines } from '@/lib/api/lines'; // your getLines function
import { validate } from '@/lib/api/auth';
import { login } from '@/reducer/actions/auth';
import { setLines } from '@/reducer/actions/lines';


export function AppProvider({ children }: { children: ReactNode }) {
    const [appState, dispatch] = useReducer(reducer, initAppState);

    useEffect(() => {
        async function validateUserAndFetchLines() {
            try {
                // 1️⃣ Validate user session via centralized function
                const data = await validate();
                dispatch(login(data.username, data.password));

                // 2️⃣ Fetch lines via centralized function
                const lines = await getLines();
                dispatch(setLines(lines));

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
