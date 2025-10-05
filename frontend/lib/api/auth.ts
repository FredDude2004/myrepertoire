const BASE_URL = "http://api.localhost";

export async function signup(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}

export async function loginFetch(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json();
}

export async function logoutFetch() {
    await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // important for clearing cookies
    });
}

export async function validate() {
    const res = await fetch(`${BASE_URL}/validate`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Not authenticated");
    }

    return res.json();
}

