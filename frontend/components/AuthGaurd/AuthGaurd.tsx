'use client';

import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/Context";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { appState } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        async function validateUserAndFetchLines() {
            const res = await fetch('http://localhost:8080/validate', {
                credentials: 'include',
            });

            if (!res.ok) router.replace("/login"); // redirect to login page
            else router.push("/repertoire");
        }

        if (!appState.user) {
        }
    }, [appState.user, router]);

    if (!appState.user) return null; // or a loading spinner

    return <>{children}</>;
}
