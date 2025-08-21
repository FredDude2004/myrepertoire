import './globals.css';
import type { Metadata } from "next";
import { AppProvider } from './providers/AppProvider';

export const metadata: Metadata = {
    title: "myrepertoire.io",
    description: "A platform to help you build and drill your chess openings repertoire.",
    icons: {
        icon: '/favicon.svg', // Path to your SVG favicon in the public directory
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
