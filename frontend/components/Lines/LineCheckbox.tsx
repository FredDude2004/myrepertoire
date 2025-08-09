import React from 'react';
import { useAppContext } from '@/contexts/Context';
import { getLines } from '@/lib/api/lines';
import { setLines, toggleSelectedLineIdx } from '@/reducer/actions/lines'

interface LineCheckboxProps {
    onEditLine: (line: any) => void;
}

const LineCheckbox = ({ onEditLine }: LineCheckboxProps) => {
    const { appState: { userLines, userLineIndexes }, dispatch } = useAppContext();

    async function refreshLines() {
        const lines = await getLines();
        dispatch(setLines(lines));
    }

    function handleToggle(idx: number) {
        dispatch(toggleSelectedLineIdx(idx));
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this line?")) return;

        try {
            const res = await fetch(`http://localhost:8080/api/lines/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!res.ok) throw new Error("Failed to delete line");
            refreshLines();
        } catch (err) {
            console.error(err);
            alert("Error deleting line");
        }
    }

    return (
        <>
            {userLines.map((line: any, idx: number) => (
                <div key={line.ID} className="line-item">
                    <input
                        type="checkbox"
                        checked={userLineIndexes.includes(idx)}
                        onChange={() => handleToggle(idx)}
                    />
                    <span className="line-name">{line.Name}</span>
                    <button onClick={() => onEditLine(line)}>Edit</button>
                    <button onClick={() => handleDelete(line.ID)}>Delete</button>
                </div>
            ))}
        </>
    );
};

export default LineCheckbox;
