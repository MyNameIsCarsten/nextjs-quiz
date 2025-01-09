import { createContext } from 'react';

// Define types for settings and actions
interface Quiz {
    chosenCorrectly: number;
}

// QuizContext.tsx
export type Action = {
    type: string;
    payload?: any; // Make payload optional
};

// Create contexts with appropriate types
export const QuizContext = createContext<Quiz | null>(null);
export const QuizDispatchContext = createContext<React.Dispatch<Action> | null>(null);