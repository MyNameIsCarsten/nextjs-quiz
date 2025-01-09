import React from "react";
import { useEditAnswers } from "@/hooks/useEditAnswers";
import { render, screen, act } from "@testing-library/react";

type TestComponentProps = {
    id: string | string[] | undefined;
};

const TestComponent: React.FC<TestComponentProps> = ({ id }) => {
    const { question, answers, loading } = useEditAnswers(id);

    if (loading) return <div data-testid="loading">Loading...</div>;
    if (!question) return <div data-testid="no-question">Question not found</div>;

    return (
        <div>
            <div data-testid="question">{question.text}</div>
            <ul data-testid="answers">
                {answers.map((answer, index) => (
                    <li key={index}>{answer.text}</li>
                ))}
            </ul>
        </div>
    );
};


global.fetch = jest.fn();

describe("useEditAnswers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch question and answers on valid id", async () => {
        const mockEntries = [
            { questionSet: 1, type: "question", text: "Sample Question" },
            { questionSet: 1, type: "answer", text: "Answer 1" },
            { questionSet: 1, type: "answer", text: "Answer 2" },
        ];
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockEntries,
        });

        await act(async () => {
            render(<TestComponent id="1" />);
        });

        expect(screen.getByTestId("question").textContent).toBe("Sample Question");
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
        expect(screen.getAllByRole("listitem")[0].textContent).toBe("Answer 1");
        expect(screen.getAllByRole("listitem")[1].textContent).toBe("Answer 2");
    });

    it("should handle invalid id and return no question", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => [],
        });

        await act(async () => {
            render(<TestComponent id="999" />);
        });

        expect(screen.getByTestId("no-question").textContent).toBe("Question not found");
    });

    it("should handle fetch error gracefully", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));

        await act(async () => {
            render(<TestComponent id="1" />);
        });

        expect(screen.getByTestId("no-question").textContent).toBe("Question not found");
    });

    it("should handle undefined id and skip fetch", async () => {
        render(<TestComponent id={undefined} />);

        // Assert the loading state
        expect(screen.getByTestId("loading").textContent).toBe("Loading...");
    });
});
