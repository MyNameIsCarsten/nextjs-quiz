import styles from "../../../styles/progressbar.module.css";
import Link from "next/link";

type ProgressbarProps = {

};

const ProgressbarDummy = ({  }: ProgressbarProps) => {

    return (
        <footer className={styles.progressbar}>
            <button>
                <Link href="/">Go Back To Quiz</Link>
            </button>
        </footer>
    );
};

export default ProgressbarDummy;
