import React from "react";
import { act, render } from "@testing-library/react";
import { useQuestionEditor } from "@/hooks/useQuestionEditor";

describe("useQuestionEditor", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    it("should fetch and set question data when ID is provided", async () => {
        const mockData = { text: "Sample Question" };
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        let result: any = {};
        function TestComponent({ id }: { id: string | undefined }) {
            result = useQuestionEditor(id);
            return null;
        }

        act(() => {
            render(<TestComponent id="123" />);
        });

        // Wait for the effect to run
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).toHaveBeenCalledWith(`/api/entries/123`);
        expect(result.question).toEqual(mockData);
        expect(result.newText).toBe("Sample Question");
    });

    it("should handle fetch errors gracefully", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

        let result: any = {};
        function TestComponent({ id }: { id: string | undefined }) {
            result = useQuestionEditor(id);
            return null;
        }

        act(() => {
            render(<TestComponent id="123" />);
        });

        // Wait for the effect to run
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).toHaveBeenCalledWith(`/api/entries/123`);
        expect(result.question).toEqual({ text: "" });
        expect(result.newText).toBe("");
    });

    it("should not fetch if ID is not provided", async () => {
        let result: any = {};
        function TestComponent({ id }: { id: string | undefined }) {
            result = useQuestionEditor(id);
            return null;
        }

        act(() => {
            render(<TestComponent id={undefined} />);
        });

        // Wait for the effect to run
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).not.toHaveBeenCalled();
        expect(result.question).toEqual({ text: "" });
        expect(result.newText).toBe("");
    });
});
