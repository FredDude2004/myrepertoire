'use client';

import './quiz.css';
import Board from '../../components/Board/Board';
import Control from '../../components/Control/Control';
import DrillStatus from '../../components/Control/bits/DrillStatus';
import MovesList from '../../components/Control/bits/MovesList';
import FirstMove from '../../components/Control/bits/FirstMove';
import PreviousMove from '../../components/Control/bits/PreviousMove';
import NextMove from '../../components/Control/bits/NextMove';
import CurrentMove from '../../components/Control/bits/CurrentMove';
import FlipBoard from '../../components/Control/bits/FlipBoard';
import { HeroHeader } from '../../components/ui/header'
import AuthGuard from '@/components/AuthGaurd/AuthGaurd';

export default function Quiz() {
    return (
        <AuthGuard>
            <HeroHeader />

            <div className="Quiz">
                <Board />
                <Control>
                    <DrillStatus />
                    <MovesList className="move-list" />
                    <div className="move-controls">
                        <FlipBoard />
                        <FirstMove />
                        <PreviousMove />
                        <NextMove />
                        <CurrentMove />
                    </div>
                </Control>
            </div>
        </AuthGuard>
    );
}
