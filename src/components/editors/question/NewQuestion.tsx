import styles from "@/styles/app.module.css";
import {useState} from "react";
import {Entry} from "@/types/Entry";
import NewQuestionText from "@/components/editors/question/NewQuestionText";
import QuestionAddButton from "@/components/editors/question/QuestionAddButton";

interface Props {
    questions: Entry[],
    setQuestions: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function NewQuestion({questions, setQuestions}: Props) {
    const [newQuestionText, setNewQuestionText] = useState("");

    return (
        <div className={styles.newQuestion}>
            <NewQuestionText
                newQuestionText={newQuestionText}
                setNewQuestionText={setNewQuestionText}
            />
            <QuestionAddButton
                newQuestionText={newQuestionText}
                setNewQuestionText={setNewQuestionText}
                questions={questions}
                setQuestions={setQuestions}
            />
            <p style={{fontSize: "12px", fontStyle: "italic"}}>(First Step: Add new question. Second Step: Edit answers.)</p>
        </div>
    );
}

export default NewQuestion;
