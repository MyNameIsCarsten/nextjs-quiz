import { useEffect, useState } from "react";
import { Entry } from "@/types/Entry";
import styles from "../../styles/app.module.css";
import ProgressbarDummy from "@/components/bars/progressbar/ProgressbarDummy";
import { useRouter } from "next/router";
import Questions from "@/components/editors/question/Questions";
import NewQuestion from "@/components/editors/question/NewQuestion";
import {useQuizQuestions} from "@/hooks/useQuizQuestions";

export default function QuizPage() {
    const { questions, setQuestions } = useQuizQuestions();

    return (
        <>
            <div className={styles.app}>
                <h1>Quiz Questions</h1>
                <Questions
                    questions={questions}
                    setQuestions={setQuestions}
                />
                <br/>
                <NewQuestion
                    questions={questions}
                    setQuestions={setQuestions}
                />
            </div>
            <ProgressbarDummy/>
        </>
    );
}
