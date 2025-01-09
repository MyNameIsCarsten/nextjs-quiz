import { render, screen, fireEvent } from "@testing-library/react";

import { Entry } from "@/types/Entry";
import QuestionDeleteButton from "@/components/editors/question/QuestionDeleteButton";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe("QuestionDeleteButton", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the Delete Question button", () => {
        render(<QuestionDeleteButton id={1} setQuestions={jest.fn()} />);

        expect(screen.getByText("Delete Question")).toBeInTheDocument();
    });

    it("shows a confirmation dialog when the delete button is clicked", () => {
        const confirmMock = jest.spyOn(window, "confirm").mockImplementation(() => false);

        render(<QuestionDeleteButton id={1} setQuestions={jest.fn()} />);

        const deleteButton = screen.getByText("Delete Question");
        fireEvent.click(deleteButton);

        expect(confirmMock).toHaveBeenCalledWith("Are you sure you want to delete this question?");
    });

    it("calls fetch and updates state when confirmed", async () => {
        const setQuestions = jest.fn();
        const confirmMock = jest.spyOn(window, "confirm").mockReturnValue(true);

        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        jest.spyOn(window, "alert").mockImplementation(() => {});

        render(<QuestionDeleteButton id={1} setQuestions={setQuestions} />);

        const deleteButton = screen.getByText("Delete Question");
        fireEvent.click(deleteButton);

        await screen.findByText("Delete Question"); // Wait for the promise to resolve

        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, { method: "DELETE" });
        expect(setQuestions).toHaveBeenCalledWith(expect.any(Function));
    });

    it("does not call fetch or update state if deletion is canceled", () => {
        const setQuestions = jest.fn();
        const confirmMock = jest.spyOn(window, "confirm").mockReturnValue(false);

        render(<QuestionDeleteButton id={1} setQuestions={setQuestions} />);

        const deleteButton = screen.getByText("Delete Question");
        fireEvent.click(deleteButton);

        expect(confirmMock).toHaveBeenCalledWith("Are you sure you want to delete this question?");
        expect(fetch).not.toHaveBeenCalled();
        expect(setQuestions).not.toHaveBeenCalled();
    });

    it("handles fetch errors gracefully", async () => {
        const setQuestions = jest.fn();
        const confirmMock = jest.spyOn(window, "confirm").mockReturnValue(true);

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        render(<QuestionDeleteButton id={1} setQuestions={setQuestions} />);

        const deleteButton = screen.getByText("Delete Question");
        fireEvent.click(deleteButton);

        await screen.findByText("Delete Question"); // Wait for the promise to resolve

        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, { method: "DELETE" });
        expect(setQuestions).not.toHaveBeenCalled();
    });
});
