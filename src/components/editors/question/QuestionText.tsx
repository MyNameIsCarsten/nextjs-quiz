import styles from "@/styles/app.module.css";
import React from "react";

interface Props {
    newText: string,
    setNewText: (value: (((prevState: string) => string) | string)) => void,
    inputRef: React.RefObject<HTMLInputElement>,
    hiddenSpanRef: React.RefObject<HTMLSpanElement>,
    questionId: string | string[] | undefined
}

function QuestionText({newText, setNewText, inputRef, hiddenSpanRef, questionId}: Props) {

    // Dynamically update input width as user types
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewText(e.target.value);
        if (hiddenSpanRef.current) {
            hiddenSpanRef.current.textContent = e.target.value || " ";
        }

        try {
            const res = await fetch(`/api/entries/${questionId}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: e.target.value}),
            });

            if (res.ok) {
                console.log("Question text updated successfully!");
            } else {
                console.error("Failed to update question text");
            }
        } catch (error) {
            console.error("Error updating question text:", error);
        }
    };
    return (
        <input
            data-testid={"question-text"}
            className={styles.input}
            ref={inputRef}
            type="text"
            value={newText}
            onChange={handleInputChange}
            style={{
                width: hiddenSpanRef.current
                    ? `${hiddenSpanRef.current.offsetWidth + 5}px`
                    : "auto",
            }}
        />
    );
}

export default QuestionText;
