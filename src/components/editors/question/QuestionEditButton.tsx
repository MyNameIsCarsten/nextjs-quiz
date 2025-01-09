import styles from "@/styles/app.module.css";
import {useRouter} from "next/router";

interface Props {
    id: number
}

function QuestionEditButton({id}: Props) {
    const router = useRouter();

    return (
        <button className={styles.button} onClick={() => router.push(`/questions/edit/${id}`)}>Edit
            Question
        </button>
    );
}

export default QuestionEditButton;
