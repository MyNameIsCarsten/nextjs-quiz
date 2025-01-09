import { createContext } from 'react';

// Define types for settings and actions
export interface Settings {
    [key: string]: boolean;
}

interface Action {
    type: string;
    payload: any;
}

// Create contexts with appropriate types
export const SettingsContext = createContext<Settings | null>(null);
export const SettingsDispatchContext = createContext<React.Dispatch<Action> | null>(null);