const BASE_URL = "http://api.myrepertoire.cloud";

export async function getLines() {
    const res = await fetch(`${BASE_URL}/api/lines`, {
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch lines");
    }
    return res.json();
}

export async function createLine(data: { name: string, color: string, pgn: string }) {
    const res = await fetch(`${BASE_URL}/api/lines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            name: data.name,
            color: data.color,
            original_pgn: data.pgn, // <-- snake_case
        }),
    });
    if (!res.ok) {
        throw new Error("Failed to create line");
    }
    return res.json();
}

export async function updateLine(id: number, data: { name: string, color: string, original_pgn: string }) {
    const res = await fetch(`${BASE_URL}/api/lines/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to update line");
    }
    return res.json();
}

export async function deleteLine(id: number) {
    const res = await fetch(`${BASE_URL}/api/lines/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to delete line");
    }
    return res.json();
}
