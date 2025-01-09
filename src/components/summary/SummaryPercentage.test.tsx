import { render, screen } from "@testing-library/react";
import SummaryPercentage from "@/components/summary/SummaryPercentage";

describe("SummaryPercentage Component", () => {
    it("renders the correct percentage when numerator and denominator are provided", () => {
        render(<SummaryPercentage numerator={50} denominator={100} />);

        const percentageText = screen.getByText("50%");
        expect(percentageText).toBeInTheDocument();
    });

    it("renders 0% when numerator is 0", () => {
        render(<SummaryPercentage numerator={0} denominator={100} />);

        const percentageText = screen.getByText("0%");
        expect(percentageText).toBeInTheDocument();
    });

    it("renders 100% when numerator equals denominator", () => {
        render(<SummaryPercentage numerator={100} denominator={100} />);

        const percentageText = screen.getByText("100%");
        expect(percentageText).toBeInTheDocument();
    });

    it("handles division by zero gracefully", () => {
        render(<SummaryPercentage numerator={50} denominator={0} />);

        const percentageText = screen.getByText("0%");
        expect(percentageText).toBeInTheDocument();
    });
});