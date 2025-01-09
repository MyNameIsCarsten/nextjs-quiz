import styles from "@/styles/app.module.css";
import {router} from "next/client";
import {useState} from "react";
import {Entry} from "@/types/Entry";

interface Props {
    setAnswers: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void,
    questionSet: number
}

function AddAnswer({ setAnswers, questionSet}: Props) {
    const [newAnswerText, setNewAnswerText] = useState(""); // State for the new answer

    const addAnswer = async () => {
        if (!newAnswerText.trim()) {
            alert("Answer text cannot be empty.");
            return;
        }

        try {
            const res = await fetch(`/api/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: newAnswerText,
                    type: "answer",
                    questionSet: questionSet,
                    isCorrect: false, // Default to not correct
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to add answer");
            }

            const newAnswer = await res.json();
            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
            setNewAnswerText(""); // Clear the input field
            alert("Answer added successfully!");
        } catch (error) {
            console.error("Error adding answer:", error);
        }
    };

    return (
        <>
            <div className={styles.newAnswer}>
                <input
                    data-testid={"addAnswerInput"}
                    type="text"
                    value={newAnswerText}
                    onChange={(e) => setNewAnswerText(e.target.value)}
                    placeholder="Enter new answer"
                />
                <button className={styles.button} onClick={addAnswer}>Add Answer</button>
            </div>
            <br/>

        </>
    );
}

export default AddAnswer;
