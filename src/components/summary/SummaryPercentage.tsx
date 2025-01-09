import styles from "@/styles/summary.module.css";
import React from "react";

interface Props {
    numerator: number;
    denominator: number;
}

function SummaryPercentage({ numerator, denominator }: Props) {
    return (
        <div className={styles.percent}>
            {numerator <= denominator ? (
                <p>{Math.floor((numerator / denominator) * 100)}%</p>
            ) : (
                <p>0%</p>
            )}
        </div>
    );
}

export default SummaryPercentage;