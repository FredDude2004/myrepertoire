'use client';

import './repertoire.css';
import { HeroHeader } from '../../components/ui/header';
import LineCheckbox from '@/components/Lines/LineCheckbox';
import LineForm from '@/components/Lines/LineForm';
import { useState } from 'react';
import { useAppContext } from '@/contexts/Context';
import { getLines } from '@/lib/api/lines';
import actionTypes from '@/reducer/actionTypes';

export default function Repertoire() {
    const [editingLine, setEditingLine] = useState(null);
    const { dispatch } = useAppContext();

    async function refreshLines() {
        const lines = await getLines();
        dispatch({ type: actionTypes.SET_LINES, payload: lines });
        setEditingLine(null); // close the form after save
    }

    return (
        <>
            <HeroHeader />
            <div className="repertoire-container">
                <div className="line-list">
                    <LineCheckbox onEditLine={setEditingLine} />
                </div>

                <div className="form-container">
                    <LineForm
                        line={editingLine || undefined}
                        onSuccess={refreshLines}
                    />
                </div>
            </div>
        </>
    );
}

