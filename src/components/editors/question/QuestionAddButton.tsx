import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";

interface Props {
    newQuestionText: string,
    setNewQuestionText: (value: (((prevState: string) => string) | string)) => void,
    questions: Entry[],
    setQuestions: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function QuestionAddButton({newQuestionText, setNewQuestionText, questions, setQuestions}: Props) {
    const addQuestion = async () => {
        if (!newQuestionText.trim()) {
            alert("Question text cannot be empty.");
            return;
        }

        try {
            // Find the highest questionSet number and increment it for the new question
            const maxQuestionSet = Math.max(...questions.map((q) => q.questionSet), 0) + 1;

            const res = await fetch("/api/entries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: newQuestionText,
                    type: "question",
                    questionSet: maxQuestionSet,
                    isCorrect: false,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to add question");
            }

            const newQuestion = await res.json();

            // Update the local state with the new question
            setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
            setNewQuestionText(""); // Clear the input field
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    return (
        <button className={styles.button} onClick={addQuestion}>Add Question</button>
    );
}

export default QuestionAddButton;
