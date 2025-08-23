'use client';

import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/Context";
import { useEffect } from "react";
import { validate } from "@/lib/api/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { appState } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        async function validateUserAndFetchLines() {
            try {
                await validate();
            } catch (err: any) {
                router.replace("/login"); // redirect to login page
                return;
            }
        }

        validateUserAndFetchLines();
    }, [appState.user, router]);

    if (!appState.user) return null; // or a loading spinner

    return <>{children}</>;
}
