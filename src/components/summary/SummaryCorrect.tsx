import styles from "@/styles/summary.module.css";
import React from "react";

interface Props {
    chosenCorrectly: number
}

function SummaryCorrect({chosenCorrectly}: Props) {
    return (
        <div className={styles.summaryline}>
            <div className={styles.whitecircle}><span>&#x2713;</span></div>
            <p>Correctly answered: {chosenCorrectly}.</p>
        </div>
    );
}

export default SummaryCorrect;
