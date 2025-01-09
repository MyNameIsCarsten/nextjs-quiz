import styles from "@/styles/app.module.css";
import {Entry} from "@/types/Entry";
import Question from "@/components/editors/question/Question";

interface Props {
    questions: Entry[],
    setQuestions: (value: (((prevState: Entry[]) => Entry[]) | Entry[])) => void
}


function Questions({questions, setQuestions}: Props) {
    return (
        <div className={styles.scroll} data-testid={"question"}>
            {
                questions.length !== 0 ?
                    questions.map((question) => (
                        <Question
                            key={question.id}
                            question={question}
                            setQuestions={setQuestions}
                        />
                    ))
                    :
                    <p>No questions available. Add a new question.</p>
            }
        </div>
    );
}

export default Questions;
