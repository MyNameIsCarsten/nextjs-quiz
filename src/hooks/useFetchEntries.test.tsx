import React from "react";
import { act, render } from "@testing-library/react";
import { useFetchEntries } from "@/hooks/useFetchEntries";

describe("useFetchEntries", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    it("should fetch and structure entries correctly", async () => {
        const mockData = [
            { id: 1, questionSet: 0, text: "Question 1" },
            { id: 2, questionSet: 1, text: "Question 2" },
            { id: 3, questionSet: 0, text: "Question 3" },
        ];
        (fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => mockData,
        });

        let result: any = {};
        function TestComponent() {
            result = useFetchEntries();
            return null;
        }

        act(() => {
            render(<TestComponent />);
        });

        // Wait for the fetch effect
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).toHaveBeenCalledWith("/api/entries");
        expect(result.entries).toEqual([
            [
                { id: 1, questionSet: 0, text: "Question 1" },
                { id: 3, questionSet: 0, text: "Question 3" },
            ],
            [{ id: 2, questionSet: 1, text: "Question 2" }],
        ]);
    });

    it("should handle fetch errors gracefully", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

        let result: any = {};
        function TestComponent() {
            result = useFetchEntries();
            return null;
        }

        act(() => {
            render(<TestComponent />);
        });

        // Wait for the fetch effect
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(fetch).toHaveBeenCalledWith("/api/entries");
        expect(result.entries).toEqual([]); // Default state
    });
});
