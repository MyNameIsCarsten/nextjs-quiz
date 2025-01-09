import styles from "@/styles/app.module.css";
import {useRouter} from "next/router";

interface Props {
    questionSet: number
}

function AnswersEditButton({questionSet}: Props) {
    const router = useRouter();

    return (
        <button className={styles.button}
                onClick={() => router.push(`/questions/answers/${questionSet}`)}>Edit
            Answers
        </button>
    );
}

export default AnswersEditButton;
