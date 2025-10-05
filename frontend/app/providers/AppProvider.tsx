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
import { useRouter } from 'next/navigation'; // Next 13+ App Router
import * as gtag from '@/lib/gtag';

export function AppProvider({ children }: { children: ReactNode }) {
    const [appState, dispatch] = useReducer(reducer, initAppState);
    const router = useRouter();

    // Track pageviews for GA
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageview(url);
        };

        // listen to route changes
        const unsubscribe = router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            unsubscribe();
        };
    }, [router.events]);

    useEffect(() => {
        async function validateUserAndFetchLines() {
            try {
                const data = await validate();
                dispatch(login(data.username, data.password));
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
