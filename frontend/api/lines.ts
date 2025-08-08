export async function getLines() {
    const res = await fetch("http://localhost:8080/api/lines", {
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch lines");
    }
    return res.json();
}

export async function createLine(data: { name: string, color: string, OriginalPGN: string }) {
    const res = await fetch("http://localhost:8080/api/lines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Failed to create line");
    }
    return res.json();
}
