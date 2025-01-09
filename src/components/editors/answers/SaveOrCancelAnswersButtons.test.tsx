import { render, screen, fireEvent } from "@testing-library/react";

import { router } from "next/client";
import SaveOrCancelAnswersButtons from "@/components/editors/answers/SaveOrCancelAnswersButtons";
import {Entry} from "@/types/Entry";

jest.mock("next/client", () => ({
    router: {
        push: jest.fn(),
    },
}));

global.fetch = jest.fn();

describe("SaveOrCancelAnswersUpdate", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders Save and Cancel buttons", () => {
        render(<SaveOrCancelAnswersButtons answers={[]} />);

        expect(screen.getByText("Save All Changes")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("calls fetch for each answer when Save All Changes is clicked", async () => {
        const answers: Entry[] = [
            { id: 1, text: "Answer 1", isCorrect: true, questionSet: 1, type: "answer" },
            { id: 2, text: "Answer 2", isCorrect: false, questionSet: 1, type: "answer" },
        ];

        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        render(<SaveOrCancelAnswersButtons answers={answers} />);

        const saveButton = screen.getByText("Save All Changes");
        fireEvent.click(saveButton);

        await screen.findByText("Save All Changes"); // Wait for updates

        expect(fetch).toHaveBeenCalledTimes(answers.length);
        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Answer 1", isCorrect: true }),
        });
        expect(fetch).toHaveBeenCalledWith(`/api/entries/2`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Answer 2", isCorrect: false }),
        });
        expect(router.push).toHaveBeenCalledWith("/questions");
    });

    it("redirects to /questions when Cancel is clicked", () => {
        render(<SaveOrCancelAnswersButtons answers={[]} />);

        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);

        expect(router.push).toHaveBeenCalledWith("/questions");
    });

    it("handles fetch errors gracefully", async () => {
        const answers: Entry[] = [
            { id: 1, text: "Answer 1", isCorrect: true, questionSet: 1, type: "answer" },
        ];

        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        render(<SaveOrCancelAnswersButtons answers={answers} />);

        const saveButton = screen.getByText("Save All Changes");
        fireEvent.click(saveButton);

        await screen.findByText("Save All Changes"); // Wait for updates

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`/api/entries/1`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "Answer 1", isCorrect: true }),
        });
        expect(router.push).not.toHaveBeenCalled();
    });
});
