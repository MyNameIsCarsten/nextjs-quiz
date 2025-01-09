import { render, screen, fireEvent } from "@testing-library/react";

import React from "react";
import QuestionAndAnswersDelete from "@/components/editors/question/QuestionAndAnswersDelete";

global.fetch = jest.fn();

describe("QuestionAndAnswersDelete", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the Delete Q & A button", () => {
        const setQuestions = jest.fn();

        render(<QuestionAndAnswersDelete questionSet={1} setQuestions={setQuestions} />);

        expect(screen.getByText("Delete Q & A")).toBeInTheDocument();
    });

    it("calls fetch and updates state when deletion is confirmed", async () => {
        const setQuestions = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(true);

        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        render(<QuestionAndAnswersDelete questionSet={1} setQuestions={setQuestions} />);

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        const deleteButton = screen.getByText("Delete Q & A");
        fireEvent.click(deleteButton);

        await screen.findByText("Delete Q & A"); // Wait for the promise to resolve

        expect(fetch).toHaveBeenCalledWith("/api/entries", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questionSet: 1 }),
        });
        expect(setQuestions).toHaveBeenCalledWith(expect.any(Function));
    });

    it("does not call fetch or update state if deletion is canceled", () => {
        const setQuestions = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(false);

        render(<QuestionAndAnswersDelete questionSet={1} setQuestions={setQuestions} />);

        const deleteButton = screen.getByText("Delete Q & A");
        fireEvent.click(deleteButton);

        expect(fetch).not.toHaveBeenCalled();
        expect(setQuestions).not.toHaveBeenCalled();
    });

    it("handles fetch errors gracefully", async () => {
        const setQuestions = jest.fn();
        jest.spyOn(window, "confirm").mockReturnValue(true);

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        render(<QuestionAndAnswersDelete questionSet={1} setQuestions={setQuestions} />);

        const deleteButton = screen.getByText("Delete Q & A");
        fireEvent.click(deleteButton);

        await screen.findByText("Delete Q & A"); // Wait for the promise to resolve

        expect(fetch).toHaveBeenCalledWith("/api/entries", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questionSet: 1 }),
        });
        expect(setQuestions).not.toHaveBeenCalled();
    });
});