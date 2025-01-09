import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";

interface Props {
    answer: Entry,
    setAnswers: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function AnswerIsCorrectCheckbox({answer, setAnswers}: Props) {
    const handleCorrectChange = async (answerId: number) => {
        try {
            const res = await fetch(`/api/entries/${answerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCorrect: true }), // Set isCorrect to true
            });

            if (res.ok) {
                const updatedAnswer = await res.json();
                setAnswers((prevAnswers) =>
                    prevAnswers.map((prevAnswer) =>
                        prevAnswer.id === answerId ? updatedAnswer : prevAnswer
                    )
                );
            } else {
                console.error("Failed to update answer");
            }
        } catch (error) {
            console.error("Error updating answer:", error);
        }
    };

    return (
        <label className={styles.correctLabel}>
            <input
                data-testid={"answer-is-correct-checkbox"}
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleCorrectChange(answer.id)}
            />
            Correct
        </label>
    );
}

export default AnswerIsCorrectCheckbox;
