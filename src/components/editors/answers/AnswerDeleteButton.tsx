import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";

interface Props {
    answer: Entry,
    setAnswers: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function AnswerDeleteButton({answer, setAnswers}: Props) {
    const deleteAnswer = async (answerId: number) => {
        if (!window.confirm("Are you sure you want to delete this answer?")) {
            return;
        }

        try {
            const res = await fetch(`/api/entries/${answerId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete answer");
            }

            setAnswers((prevAnswers) => prevAnswers.filter((answer) => answer.id !== answerId));
            alert("Answer deleted successfully!");
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
    };

    return (
        <button data-testid={"answer-delete-button"} className={styles.button} onClick={() => deleteAnswer(answer.id)}>Delete</button>
    );
}

export default AnswerDeleteButton;
