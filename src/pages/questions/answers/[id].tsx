import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/app.module.css";
import ProgressbarDummy from "@/components/bars/progressbar/ProgressbarDummy";
import { Entry } from "@/types/Entry";
import AnswerEditor from "@/components/editors/answers/AnswerEditor";
import AddAnswer from "@/components/editors/answers/AddAnswer";
import SaveOrCancelAnswersButtons from "@/components/editors/answers/SaveOrCancelAnswersButtons";
import AnswersEditor from "@/components/editors/answers/AnswersEditor";
import {useEditAnswers} from "@/hooks/useEditAnswers";

export default function EditAnswersPage() {
    const router = useRouter();
    const { id } = router.query; // Get the question ID from the URL

    const { question, answers, setAnswers, loading } = useEditAnswers(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!question) {
        return <div>Question not found</div>;
    }

    return (
        <>
            <div className={styles.app}>
                <h1>Edit Answers</h1>
                <div className={styles.form}>
                    <h2>{question.text}</h2>
                    <AnswersEditor
                        answers={answers}
                        setAnswers={setAnswers}
                    />
                    <br/>

                    <AddAnswer
                        setAnswers={setAnswers}
                        questionSet={question.questionSet}
                    />
                    <SaveOrCancelAnswersButtons
                        answers={answers}
                    />
                </div>
            </div>
            <ProgressbarDummy/>
        </>
    );
}

