import { quizReducer, initialQuiz, QuizState } from "@/reducers/quizReducer";

describe("quizReducer", () => {
    it("should increment 'chosenCorrectly' for 'hasSelected' action", () => {
        const state: QuizState = { chosenCorrectly: 0 };
        const action = { type: 'hasSelected' };
        const newState = quizReducer(state, action);
        expect(newState.chosenCorrectly).toBe(1);
    });

    it("should throw an error for unknown action types", () => {
        const state: QuizState = { chosenCorrectly: 0 };
        const action = { type: 'unknown' };
        expect(() => quizReducer(state, action)).toThrowError("Unknown action: unknown");
    });
});
