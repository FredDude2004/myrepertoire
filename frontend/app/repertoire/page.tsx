'use client';

import './repertoire.css';
import { reducer } from '../../reducer/reducer';
import { useReducer } from 'react';
import { initGameState } from '../../constants';
import AppContext from '../../contexts/Context';
import { HeroHeader } from '../../components/ui/header';
import { } from '@radix-ui/react-radio-group';
import Checkbox from '@/components/Lines/Checkbox';

export default function Quiz() {
    const [appState, dispatch] = useReducer(reducer, initGameState);

    const providerState = { appState, dispatch };

    return (
        <>
            <HeroHeader />
            <div
                aria-hidden
                className="absolute inset-0 isolate hidden contain-strict lg:block">
                <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
            </div>

            <AppContext.Provider value={providerState}>
                <div className="repertoire-container">
                    <div className="line-list">
                        <Checkbox />

                    </div>
                    <div className="form-container">
                        <form className="line-form" action="#" method="post" noValidate>
                            <label htmlFor="lineName">Line Name</label>
                            <input type="text" id="lineName" name="lineName" required />

                            <label htmlFor="colorSelect">Color</label>
                            <select id="colorSelect" name="colorSelect" required>
                                <option defaultValue="" disabled selected>
                                    Select color
                                </option>
                                <option value="White">White</option>
                                <option value="Black">Black</option>
                            </select>

                            <label htmlFor="pgnText">PGN</label>
                            <textarea id="pgnText" name="pgnText" rows={10} required></textarea>

                            <button type="submit">Create Line</button>
                        </form>
                    </div>
                </div>
            </AppContext.Provider>
        </>
    );
}




