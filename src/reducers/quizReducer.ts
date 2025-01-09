import { Action } from "@/context/QuizContext";

export type QuizState = {
    chosenCorrectly: number;
};

export type QuizAction = {
    type: string;
    payload?: any;
};

export const initialQuiz: QuizState = {
    chosenCorrectly: 0,
};

export const quizReducer = (quiz: any, action: Action) => {
    switch (action.type) {
        case 'hasSelected': {
            return {
                ...quiz,
                chosenCorrectly: quiz.chosenCorrectly + 1,
            };
        }
        default: {
            throw new Error(`Unknown action: ${action.type}`);
        }
    }
};

