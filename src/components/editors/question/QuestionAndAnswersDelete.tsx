import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";

interface Props {
    questionSet: number,
    setQuestions: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function QuestionAndAnswersDelete({questionSet, setQuestions}: Props) {
    const deleteSet = async (questionSet: number) => {
        if (!window.confirm("Are you sure you want to delete this question set?")) {
            return;
        }

        try {
            const res = await fetch(`/api/entries`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({questionSet}),
            });

            if (!res.ok) {
                throw new Error("Failed to delete question set");
            }

            // Remove the deleted set from local state
            setQuestions((prevQuestions) =>
                prevQuestions.filter((question) => question.questionSet !== questionSet)
            );
            alert("Question set deleted successfully!");
        } catch (error) {
            console.error("Error deleting question set:", error);
        }
    };

    return (
        <button className={styles.button} onClick={() => deleteSet(questionSet)}>Delete Q & A</button>
    );
}

export default QuestionAndAnswersDelete;
