import { render, screen } from "@testing-library/react";
import SummaryCorrect from "@/components/summary/SummaryCorrect";
import React from "react";

describe("SummaryCorrect Component", () => {
    it("renders the correct number of correctly answered questions", () => {
        render(<SummaryCorrect chosenCorrectly={5} />);

        const correctText = screen.getByText("Correctly answered: 5.");

        expect(correctText).toBeInTheDocument();
    });

    it("renders the checkmark in the white circle", () => {
        render(<SummaryCorrect chosenCorrectly={3} />);

        const checkmark = screen.getByText("✓"); // Checkmark character
        expect(checkmark).toBeInTheDocument();
    });
});