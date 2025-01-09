import { render, screen } from "@testing-library/react";
import SummaryCorrect from "@/components/summary/SummaryCorrect";
import SummaryIncorrect from "@/components/summary/SummaryIncorrect";
import React from "react";

describe("SummaryIncorrect Component", () => {
    it("renders the correct number of incorrectly answered questions", () => {
        render(<SummaryIncorrect chosenCorrectly={2} total={5} />);

        const incorrectText = screen.getByText("Incorrectly answered: 3.");

        expect(incorrectText).toBeInTheDocument();
    });

    it("renders the X mark in the white circle", () => {
        render(<SummaryIncorrect chosenCorrectly={1} total={4} />);

        const xMark = screen.getByText("X"); // X character
        expect(xMark).toBeInTheDocument();
    });
});
