import Answer from "@/components/quiz/Answer";
import React, {useState} from "react";
import {Entry} from "@/types/Entry";

interface Props {
    entries: Entry[]
    hasSelected: boolean,
    setHasSelected: (value: (((prevState: boolean) => boolean) | boolean)) => void,
}

function QuizAnswers({entries, hasSelected, setHasSelected}: Props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);

    return (
        <>
            {/* Display Answers */}
            {entries.map((entry) =>
                entry.type === "answer" ? (
                    <Answer
                        key={entry.id}
                        text={entry.text}
                        isCorrect={entry.isCorrect}
                        hasSelected={hasSelected}
                        isSelected={entry.id === selectedAnswerId}
                        updateSelection={() => {
                            setHasSelected(true);
                            setSelectedAnswerId(entry.id);
                        }}
                    />
                ) : null
            )}
        </>
    );
}

export default QuizAnswers;
