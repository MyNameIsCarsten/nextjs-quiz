import styles from "@/styles/app.module.css";
import {router} from "next/client";
import {Entry} from "@/types/Entry";

interface Props {
    answers: Entry[]
}

function SaveOrCancelAnswersButtons({answers}: Props) {
    const saveChanges = async () => {
        try {
            const updatePromises = answers.map((answer) =>
                fetch(`/api/entries/${answer.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                    }),
                })
            );

            await Promise.all(updatePromises);
            alert("Answers updated successfully!");
            router.push("/questions");
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "center", gap: "1rem"}}>
            <button className={styles.button} onClick={() => saveChanges()}>Save All Changes</button>
            <button className={styles.button} onClick={() => router.push("/questions")}>Cancel</button>
        </div>
    );
}

export default SaveOrCancelAnswersButtons;
