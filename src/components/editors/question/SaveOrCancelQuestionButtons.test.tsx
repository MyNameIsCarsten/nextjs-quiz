import { render, screen, fireEvent } from "@testing-library/react";

import { router } from "next/client";
import SaveOrCancelQuestionButtons from "@/components/editors/question/SaveOrCancelQuestionButtons";

jest.mock("next/client", () => ({
    router: {
        push: jest.fn(),
    },
}));

global.fetch = jest.fn();

describe("SaveOrCancelQuestionButtons", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders Save and Cancel buttons", () => {
        render(<SaveOrCancelQuestionButtons id="1" text="Updated question" />);

        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("calls fetch with correct data when Save is clicked", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        render(<SaveOrCancelQuestionButtons id="1" text="Updated question" />);

        jest.spyOn(window, 'alert').mockImplementation(() => {});

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Updated question" }),
        });
        await screen.findByText("Save"); // Wait for updates

        expect(router.push).toHaveBeenCalledWith("/questions");
    });

    it("does not redirect if fetch fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        render(<SaveOrCancelQuestionButtons id="1" text="Updated question" />);

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Updated question" }),
        });
        await screen.findByText("Save"); // Wait for updates

        expect(router.push).not.toHaveBeenCalled();
    });

    it("redirects to /questions when Cancel is clicked", () => {
        render(<SaveOrCancelQuestionButtons id="1" text="Updated question" />);

        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(router.push).toHaveBeenCalledWith("/questions");
    });

    it("handles fetch errors gracefully", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        render(<SaveOrCancelQuestionButtons id="1" text="Updated question" />);

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Updated question" }),
        });
        await screen.findByText("Save"); // Wait for updates

        expect(router.push).not.toHaveBeenCalled();
    });
});
