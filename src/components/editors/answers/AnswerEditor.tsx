import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";
import AnswerText from "@/components/editors/answers/AnswerText";
import AnswerIsCorrectCheckbox from "@/components/editors/answers/AnswerIsCorrectCheckbox";
import AnswerDeleteButton from "@/components/editors/answers/AnswerDeleteButton";

interface Props {
    answer: Entry,
    setAnswers: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function AnswerEditor({answer, setAnswers}: Props) {

    return (
        <>
            <div key={answer.id} className={styles.answerItem}>
                <AnswerText
                    answer={answer}
                    setAnswers={setAnswers}
                />
                <AnswerIsCorrectCheckbox
                    answer={answer}
                    setAnswers={setAnswers}
                />
                <AnswerDeleteButton
                    answer={answer}
                    setAnswers={setAnswers}
                />
            </div>
        </>
    );
}

export default AnswerEditor;
