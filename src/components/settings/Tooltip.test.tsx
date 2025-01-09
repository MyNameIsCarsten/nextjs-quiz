import { render, screen } from "@testing-library/react";
import React from "react";
import Tooltip from "@/components/settings/Tooltip";

describe("Tooltip Component", () => {
    it("renders the anchor and tooltip text", () => {
        render(<Tooltip anchor="Test Anchor" tip="Test Tooltip" />);

        const anchorElement = screen.getByText("Test Anchor");
        const tooltipText = screen.getByText("Test Tooltip");

        expect(anchorElement).toBeInTheDocument();
        expect(tooltipText).toBeInTheDocument();
    });

    it("applies the correct styles for the tooltip", () => {
        render(<Tooltip anchor="Styled Anchor" tip="Styled Tooltip" />);

        const tooltipText = screen.getByText("Styled Tooltip");
        expect(tooltipText).toHaveClass("tooltiptext");
    });
});
