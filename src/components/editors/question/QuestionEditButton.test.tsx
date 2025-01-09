import { render, screen, fireEvent } from "@testing-library/react";

import { useRouter } from "next/router";
import QuestionEditButton from "@/components/editors/question/QuestionEditButton";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("QuestionEditButton", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the Edit Question button", () => {
        render(<QuestionEditButton id={1} />);

        expect(screen.getByText("Edit Question")).toBeInTheDocument();
    });

    it("navigates to the correct edit page when clicked", () => {
        render(<QuestionEditButton id={1} />);

        const editButton = screen.getByText("Edit Question");
        fireEvent.click(editButton);

        expect(mockPush).toHaveBeenCalledWith("/questions/edit/1");
    });
});
