import React from "react";
import { act, render } from "@testing-library/react";
import { useQuizQuestions } from "@/hooks/useQuizQuestions";

describe("useQuizQuestions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    it("should fetch and filter questions correctly", async () => {
        const mockData = [
            { id: 1, type: "question", text: "Question 1" },
            { id: 2, type: "answer", text: "Answer 1" },
            { id: 3, type: "question", text: "Question 2" },
        ];
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        let result: any = {};
        function TestComponent() {
            result = useQuizQuestions();
            return null;
        }

        act(() => {
            render(<TestComponent />);
        });

        // Simulate the effect running
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).toHaveBeenCalledWith("/api/entries");
        expect(result.questions).toEqual([
            { id: 1, type: "question", text: "Question 1" },
            { id: 3, type: "question", text: "Question 2" },
        ]);
    });

    it("should handle fetch errors gracefully", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

        let result: any = {};
        function TestComponent() {
            result = useQuizQuestions();
            return null;
        }

        act(() => {
            render(<TestComponent />);
        });

        // Simulate the effect running
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).toHaveBeenCalledWith("/api/entries");
        expect(result.questions).toEqual([]);
    });
});
