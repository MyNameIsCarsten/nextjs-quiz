import { render, screen } from "@testing-library/react";

import React from "react";
import QuestionHiddenSpan from "@/components/editors/question/QuestionHiddenSpan";

describe("QuestionHiddenSpan", () => {
    it("renders the hidden span with the provided text", () => {
        const ref = React.createRef<HTMLSpanElement>();
        const newText = "Test Text";

        render(<QuestionHiddenSpan newText={newText} hiddenSpanRef={ref as React.RefObject<HTMLSpanElement>} />);

        const hiddenSpan = screen.getByTestId("hidden-span");

        expect(hiddenSpan).toBeInTheDocument();
        expect(hiddenSpan).toHaveTextContent(newText);
        expect(hiddenSpan).toHaveStyle({
            position: "absolute",
            visibility: "hidden",
            whiteSpace: "pre",
        });
    });

    it("renders a single space when newText is empty", () => {
        const ref = React.createRef<HTMLSpanElement>();
        const newText = "";

        render(<QuestionHiddenSpan newText={newText} hiddenSpanRef={ref as React.RefObject<HTMLSpanElement>} />);

        const hiddenSpan = screen.getByTestId("hidden-span");

        expect(hiddenSpan).toBeInTheDocument();
        expect(hiddenSpan.textContent).toBe(" "); // Ensure space is explicitly checked
    });

    it("assigns the ref to the span element", () => {
        const ref = React.createRef<HTMLSpanElement>();
        const newText = "Sample Text";

        render(<QuestionHiddenSpan newText={newText} hiddenSpanRef={ref as React.RefObject<HTMLSpanElement>} />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
});