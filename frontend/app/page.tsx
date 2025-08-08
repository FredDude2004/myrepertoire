'use client'

import HeroSection from "@/components/ui/hero-section";
import Features from "@/components/ui/features";
import AppContext from '../contexts/Context';

export default function Home() {
    return (
        <>
            <HeroSection />
            <Features />
        </>
    );
}
