import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";
import QuestionEditButton from "@/components/editors/question/QuestionEditButton";
import AnswersEditButton from "@/components/editors/answers/AnswersEditButton";
import QuestionDeleteButton from "@/components/editors/question/QuestionDeleteButton";
import QuestionAndAnswersDelete from "@/components/editors/question/QuestionAndAnswersDelete";

interface Props {
    question: Entry,
    setQuestions: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}

function Question({question, setQuestions}: Props) {

    return (
        <div className={styles.set} key={question.id}>
            <p>{question.text}</p>
            <div className={styles.editAndDelete}>
                <QuestionEditButton
                    id={question.id}
                />
                <AnswersEditButton
                    questionSet={question.questionSet}
                />
                <QuestionDeleteButton
                    id={question.id}
                    setQuestions={setQuestions}
                />
                <QuestionAndAnswersDelete
                    questionSet={question.questionSet}
                    setQuestions={setQuestions}
                />
            </div>
            <span>&#9866;</span>
        </div>
    );
}

export default Question;
