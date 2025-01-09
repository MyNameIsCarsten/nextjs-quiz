import React from "react";
import {Entry} from "@/types/Entry";

interface Props {
    entries: Entry[]
}

function QuizQuestion({entries}: Props) {
    return (
        <>
            {/* Display Questions */}
            {entries.map((entry) =>
                entry.type === "question" ?
                    <h1 key={entry.id}>{entry.text}</h1>
                    :
                    null
            )}
        </>
    );
}

export default QuizQuestion;
