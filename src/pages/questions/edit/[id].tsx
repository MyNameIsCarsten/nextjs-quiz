import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/app.module.css";
import ProgressbarDummy from "@/components/bars/progressbar/ProgressbarDummy";
import QuestionEditor from "@/components/editors/question/QuestionEditor";
import SaveOrCancelQuestionButtons from "@/components/editors/question/SaveOrCancelQuestionButtons";
import {useQuestionEditor} from "@/hooks/useQuestionEditor";

export default function EditQuestionPage() {
    const router = useRouter();
    const { id } = router.query as { id: string | undefined }; // Get the question ID from the URL
    const { question, newText, setNewText } = useQuestionEditor(id);

    return (
        <>
            <div className={styles.app}>
                <h1>Edit Question</h1>
                <div className={styles.form}>
                    <QuestionEditor
                        questionId={id}
                        newText={newText}
                        setNewText={setNewText}
                    />
                    <SaveOrCancelQuestionButtons
                        id={id}
                        text={newText}
                    />
                </div>
            </div>
            <ProgressbarDummy/>
        </>
    );
}
