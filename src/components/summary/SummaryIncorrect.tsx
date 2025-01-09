import styles from "@/styles/summary.module.css";
import React from "react";

interface Props {
    chosenCorrectly: number,
    total: number
}

function SummaryIncorrect({chosenCorrectly, total}: Props) {
    return (
        <div className={styles.summaryline}>
            <div className={styles.whitecircle}><span>X</span></div>
            <p>Incorrectly answered: {total - chosenCorrectly}.</p>
        </div>
    );
}

export default SummaryIncorrect;
