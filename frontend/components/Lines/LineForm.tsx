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
            const method = line ? "PATCH" : "POST";
            const url = line
                ? `http://localhost:8080/api/lines/${line.ID}`
                : "http://localhost:8080/api/lines";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    color,
                    original_pgn: pgn,
                }),
            });

            if (!res.ok) throw new Error(`Failed to ${line ? "edit" : "create"} line`);

            onSuccess();
            // reset form inputs here after success
            setName('');
            setColor('');
            setPgn('');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="line-form" onSubmit={handleSubmit} noValidate>
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
