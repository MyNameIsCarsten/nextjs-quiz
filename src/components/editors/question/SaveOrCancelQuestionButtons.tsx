import styles from "@/styles/app.module.css";
import {router} from "next/client";

interface Props {
    id: string | string[] | undefined,
    text: string
}


function SaveOrCancelQuestionButtons({id, text}: Props) {
    const updateQuestion = async () => {
        try {
            const res = await fetch(`/api/entries/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: text}),
            });

            if (res.ok) {
                alert("Question updated successfully!");
                router.push("/questions"); // Redirect back to the quiz page
            } else {
                console.error("Failed to update question");
            }
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "center", gap: "1rem"}}>
            <button className={styles.button} onClick={updateQuestion}>Save</button>
            <button className={styles.button} onClick={() => router.push("/questions")}>Cancel</button>
        </div>
    );
}

export default SaveOrCancelQuestionButtons;
