import React from 'react';
import { useAppContext } from '@/contexts/Context';

interface Move {
    moveNo: number;
    white: string;
    black: string;
}

interface Line {
    ID: number;
    Name: string;
    Color: string;
    OriginalPGN: string;
    ParsedPGN: Move[];
    LineID: number;
}

const Checkbox = () => {
    const { appState: { userLines } } = useAppContext();

    return (
        <>
            {userLines.map((line: Line, i: number) => (
                <div key={i} className="line-item">
                    <input type="checkbox" />
                    <span className="line-name">{line.Name}</span>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            ))}
        </>
    );
};

export default Checkbox;
