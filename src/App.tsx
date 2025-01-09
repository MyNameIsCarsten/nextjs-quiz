// src/App.tsx
import React from 'react';
import { SettingsContext } from '@/context/SettingsContext';
import { SettingsDispatchContext } from '@/context/SettingsContext';
import { useReducer } from 'react';
import Navbar from '@/components/bars/navbar/Navbar';

export default function App({ children }: { children: React.ReactNode }) {
    const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

    return (
        <SettingsContext.Provider value={settings}>
            <SettingsDispatchContext.Provider value={dispatch}>
                <Navbar />
                {children}
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );
}

export function settingsReducer(settings: any, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'changeQuestionShuffle': {
            return {
                ...settings,
                questionShuffle: action.payload,
            };
        }
        case 'changeAnswerShuffle': {
            return {
                ...settings,
                answerShuffle: action.payload,
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export const initialSettings = {
    questionShuffle: true,
    answerShuffle: true,
};
