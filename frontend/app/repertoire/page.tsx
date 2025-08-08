'use client';

import './repertoire.css';
import AppContext from '../../contexts/Context';
import { HeroHeader } from '../../components/ui/header';
import { } from '@radix-ui/react-radio-group';
import Checkbox from '@/components/Lines/Checkbox';
import Form from '@/components/Lines/Form';

export default function Repertoire() {
    return (
        <>
            <HeroHeader />
            <div className="repertoire-container">
                <div className="line-list">
                    <Checkbox />

                </div>
                <div className="form-container">
                    <Form />
                </div>
            </div>
        </>
    );
}




