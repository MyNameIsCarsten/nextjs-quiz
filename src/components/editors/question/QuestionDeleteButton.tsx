import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";

interface Props {
    id: number,
    setQuestions: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}


function QuestionDeleteButton({id, setQuestions}: Props) {
    const deleteQuestion = async (questionId: number) => {
        if (!window.confirm("Are you sure you want to delete this question?")) {
            return;
        }

        try {
            const res = await fetch(`/api/entries/${questionId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete question");
            }

            // Remove the deleted question from local state
            setQuestions((prevQuestions) =>
                prevQuestions.filter((question) => question.id !== questionId)
            );
            alert("Question deleted successfully!");
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <button className={styles.button} onClick={() => deleteQuestion(id)}>Delete Question</button>
    );
}

export default QuestionDeleteButton;
