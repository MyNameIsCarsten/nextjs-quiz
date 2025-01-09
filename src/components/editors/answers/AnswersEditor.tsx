import styles from "@/styles/app.module.css";
import AnswerEditor from "@/components/editors/answers/AnswerEditor";
import {Entry} from "@/types/Entry";

interface Props {
    answers: Entry[],
    setAnswers: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}


function AnswersEditor({answers, setAnswers}: Props) {
    return (
        <div className={styles.answers}>
            {
                answers.map((answer) => (
                <AnswerEditor
                    key={answer.id}
                    answer={answer}
                    setAnswers={setAnswers}
                />
            ))}
        </div>
    );
}

export default AnswersEditor;
