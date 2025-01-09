import { render, screen } from "@testing-library/react";
import React from "react";
import Questions from "@/components/editors/question/Questions";
import {Entry} from "@/types/Entry";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        query: {},
    }),
}));

describe("Questions Component", () => {
    it("renders a list of questions when questions are provided", () => {
        const questions: Entry[] = [
            { id: 1, text: "Question 1", questionSet: 1, type: "question", isCorrect: false },
            { id: 2, text: "Question 2", questionSet: 2, type: "question", isCorrect: true },
        ];
        const setQuestions = jest.fn();

        render(<Questions questions={questions} setQuestions={setQuestions} />);

        const questionElements = screen.getAllByTestId("question");
        expect(questionElements).toHaveLength(1); // only one question should be rendered
    });

    it("renders a message when no questions are provided", () => {
        const questions: Entry[] = [];
        const setQuestions = jest.fn();

        render(<Questions questions={questions} setQuestions={setQuestions} />);

        expect(screen.getByText("No questions available. Add a new question.")).toBeInTheDocument();
    });
});
