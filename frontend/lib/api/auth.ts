const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function signup(username: string, password: string) {
    console.log("signup called, fetching to backend: " + BASE_URL + "/signup");
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
    console.log("loginFetch called, fetching to backend: " + BASE_URL + "/login");
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
    console.log("logoutFetch called, fetching to backend: " + BASE_URL + "/logout");
    await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include", // important for clearing cookies
    });
}

export async function validate() {
    console.log("validate called, fetching to backend: " + BASE_URL + "/validate");
    const res = await fetch(`${BASE_URL}/validate`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Not authenticated");
    }

    return res.json();
}

