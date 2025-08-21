'use client';

import './repertoire.css';
import { HeroHeader } from '@/components/ui/header';
import LineCheckbox from '@/components/Lines/LineCheckbox';
import LineForm from '@/components/Lines/LineForm';
import { useState } from 'react';
import { useAppContext } from '@/contexts/Context';
import { getLines } from '@/lib/api/lines';
import { setLines, setSelectedLines } from '@/reducer/actions/lines';
import { useRouter } from "next/navigation";

export default function Repertoire() {
    const [editingLine, setEditingLine] = useState(null);
    const { appState: { selectedLinesIdxs = [] }, dispatch } = useAppContext();
    const router = useRouter();

    async function refreshLines() {
        const lines = await getLines();
        dispatch(setLines(lines));
        setEditingLine(null); // close the form after save
    }

    async function handleClick(e: React.FormEvent) {
        e.preventDefault();
        dispatch(setSelectedLines());
        router.push("/quiz");
    }

    return (
        <>
            <HeroHeader />
            <div className="repertoire-container">
                <div className="line-list">
                    <LineCheckbox onEditLine={setEditingLine} />
                    <button className="quiz-button" onClick={handleClick} disabled={selectedLinesIdxs.length === 0}>
                        Start Drill
                    </button>
                </div>

                <div className="form-container">
                    <LineForm
                        line={editingLine || undefined}
                        onSuccess={refreshLines}
                    />
                </div>
            </div >
        </>
    );
}

