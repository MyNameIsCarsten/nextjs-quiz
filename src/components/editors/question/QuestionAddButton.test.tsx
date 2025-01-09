import { render, screen, fireEvent } from "@testing-library/react";

import { Entry } from "@/types/Entry";
import QuestionAddButton from "@/components/editors/question/QuestionAddButton";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe("QuestionAddButton", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the Add Question button", () => {
        render(<QuestionAddButton
            newQuestionText=""
            setNewQuestionText={jest.fn()}
            questions={[]}
            setQuestions={jest.fn()}
        />);

        expect(screen.getByText("Add Question")).toBeInTheDocument();
    });

    it("shows an alert if the question text is empty", () => {
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

        render(<QuestionAddButton
            newQuestionText=""
            setNewQuestionText={jest.fn()}
            questions={[]}
            setQuestions={jest.fn()}
        />);

        const addButton = screen.getByText("Add Question");
        fireEvent.click(addButton);

        expect(alertMock).toHaveBeenCalledWith("Question text cannot be empty.");
    });

    it("sends a POST request with correct data when the Add Question button is clicked", async () => {
        const setNewQuestionText = jest.fn();
        const setQuestions = jest.fn();
        const questions: Entry[] = [
            { id: 1, text: "Question 1", questionSet: 1, type: "question", isCorrect: false },
        ];

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 2, text: "New Question", questionSet: 2, type: "question", isCorrect: false }),
        });

        render(<QuestionAddButton
            newQuestionText="New Question"
            setNewQuestionText={setNewQuestionText}
            questions={questions}
            setQuestions={setQuestions}
        />);

        const addButton = screen.getByText("Add Question");
        fireEvent.click(addButton);

        await screen.findByText("Add Question"); // Wait for the promise to resolve

        expect(fetch).toHaveBeenCalledWith("/api/entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: "New Question",
                type: "question",
                questionSet: 2,
                isCorrect: false,
            }),
        });

        expect(setQuestions).toHaveBeenCalledWith(expect.any(Function));
        expect(setNewQuestionText).toHaveBeenCalledWith("");
    });

    it("handles fetch errors gracefully", async () => {
        const setNewQuestionText = jest.fn();
        const setQuestions = jest.fn();
        const questions: Entry[] = [];

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        render(<QuestionAddButton
            newQuestionText="New Question"
            setNewQuestionText={setNewQuestionText}
            questions={questions}
            setQuestions={setQuestions}
        />);

        const addButton = screen.getByText("Add Question");
        fireEvent.click(addButton);

        await screen.findByText("Add Question"); // Wait for the promise to resolve

        expect(fetch).toHaveBeenCalledWith("/api/entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: "New Question",
                type: "question",
                questionSet: 1,
                isCorrect: false,
            }),
        });

        expect(setQuestions).not.toHaveBeenCalled();
        expect(setNewQuestionText).not.toHaveBeenCalled();
    });
});
