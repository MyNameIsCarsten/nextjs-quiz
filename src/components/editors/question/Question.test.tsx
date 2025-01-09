// src/components/editors/question/Question.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Question from './Question';
import { Entry } from '@/types/Entry';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        query: {},
    }),
}));

global.fetch = jest.fn();

describe('Question component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the question text', () => {
        const question: Entry = { id: 1, text: 'What is the answer to this question?', questionSet: 1, type: 'question', isCorrect: false };
        const setQuestions = jest.fn();
        const { getByText } = render(<Question question={question} setQuestions={setQuestions} />);
        expect(getByText(question.text)).toBeInTheDocument();
    });

    it('renders the question edit button', () => {
        const question: Entry = { id: 1, text: 'What is the answer to this question?', questionSet: 1, type: 'question', isCorrect: false };
        const setQuestions = jest.fn();
        const { getByText } = render(<Question question={question} setQuestions={setQuestions} />);
        expect(getByText('Edit Question')).toBeInTheDocument();
    });

    it('renders the question delete button', () => {
        const question: Entry = { id: 1, text: 'What is the answer to this question?', questionSet: 1, type: 'question', isCorrect: false };
        const setQuestions = jest.fn();
        const { getByText } = render(<Question question={question} setQuestions={setQuestions} />);
        expect(getByText('Delete Question')).toBeInTheDocument();
    });

    it("calls the setQuestions function when the delete button is clicked", async () => {
        const question: Entry = { id: 1, text: "What is the answer to this question?", questionSet: 1, type: "question", isCorrect: false };
        const setQuestions = jest.fn();

        // Mocking the window.confirm dialog to return true
        jest.spyOn(window, "confirm").mockReturnValue(true);

        jest.spyOn(window, "alert").mockImplementation(() => {});

        // Mocking the fetch API to return a successful response
        (fetch as jest.Mock).mockResolvedValue({ ok: true });

        // Rendering the component
        const { getByText, findByText } = render(<Question question={question} setQuestions={setQuestions} />);

        // Locating the delete button
        const deleteButton = getByText("Delete Question");

        // Simulating a click on the delete button
        fireEvent.click(deleteButton);

        // Waiting for state updates
        await findByText("Delete Question");

        // Verifying interactions
        expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this question?");
        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, { method: "DELETE" });
        expect(setQuestions).toHaveBeenCalledTimes(1);
        expect(setQuestions).toHaveBeenCalledWith(expect.any(Function));
    });

    it("does not call setQuestions if user cancels the confirmation dialog", () => {
        const question: Entry = { id: 1, text: "What is the answer to this question?", questionSet: 1, type: "question", isCorrect: false };
        const setQuestions = jest.fn();

        // Mocking the window.confirm dialog to return false
        jest.spyOn(window, "confirm").mockReturnValue(false);

        const { getByText } = render(<Question question={question} setQuestions={setQuestions} />);

        const deleteButton = getByText("Delete Question");
        fireEvent.click(deleteButton);

        expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this question?");
        expect(setQuestions).not.toHaveBeenCalled();
    });

    it("handles fetch failure gracefully", async () => {
        const question: Entry = { id: 1, text: "What is the answer to this question?", questionSet: 1, type: "question", isCorrect: false };
        const setQuestions = jest.fn();

        // Mocking the window.confirm dialog to return true
        jest.spyOn(window, "confirm").mockReturnValue(true);

        // Mocking the fetch API to throw an error
        (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

        const { getByText, findByText } = render(<Question question={question} setQuestions={setQuestions} />);

        const deleteButton = getByText("Delete Question");
        fireEvent.click(deleteButton);

        await findByText("Delete Question");

        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, { method: "DELETE" });
        expect(setQuestions).not.toHaveBeenCalled(); // Ensure no state update on failure
    });
});