import React from "react";

interface Props {
    newText: string,
    hiddenSpanRef: React.RefObject<HTMLSpanElement>
}

function QuestionHiddenSpan({newText, hiddenSpanRef}: Props) {
    return (
        <span
            data-testid={"hidden-span"}
            ref={hiddenSpanRef}
            style={{
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
            }}
        >
           {newText || " "}
       </span>
    );
}

export default QuestionHiddenSpan;
