import styles from "@/styles/app.module.css";

interface Props {
    newQuestionText: string,
    setNewQuestionText: (value: (((prevState: string) => string) | string)) => void
}

function NewQuestionText({newQuestionText, setNewQuestionText}: Props) {
    return (
        <input
            className={styles.input}
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Enter new question"
        />
    );
}

export default NewQuestionText;
