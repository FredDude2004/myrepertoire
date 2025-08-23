import { createLine, updateLine } from '@/lib/api/lines';
import React, { useState, useEffect } from 'react';

interface LineFormProps {
    line?: {
        ID: number;
        Name: string;
        Color: string;
        OriginalPGN: string;
    };
    onSuccess: () => void;
}

export default function LineForm({ line, onSuccess }: LineFormProps) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [pgn, setPgn] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (line) {
            setName(line.Name);
            setColor(line.Color);
            setPgn(line.OriginalPGN);
        } else {
            setName("");
            setColor("");
            setPgn("");
        }
    }, [line]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (line) {
                // Update existing line
                await updateLine(line.ID, { name, color, original_pgn: pgn });
            } else {
                // Create new line
                await createLine({ name, color, pgn });
            }

            onSuccess();

            // Reset form fields after success
            setName("");
            setColor("");
            setPgn("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="line-form" onSubmit={handleSubmit} >
            <label htmlFor="lineName">Line Name</label>
            <input
                type="text"
                id="lineName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="colorSelect">Color</label>
            <select
                id="colorSelect"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
            >
                <option value="" disabled>Select color</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
            </select>

            <label htmlFor="pgnText">PGN</label>
            <textarea
                id="pgnText"
                rows={10}
                value={pgn}
                onChange={(e) => setPgn(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Saving..." : line ? "Edit Line" : "Create Line"}
            </button>

            {error && <p className="error">{error}</p>}
        </form>
    );
}
